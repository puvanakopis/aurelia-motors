import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async findAll() {
    const brands = await this.prisma.brand.findMany({
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return brands.map((b) => ({
      ...b,
      vehicleCount: b._count.vehicles,
      _count: undefined,
    }));
  }

  async findOne(identifier: string) {
    const brand = await this.prisma.brand.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
    });

    if (!brand) {
      throw new NotFoundException(`Brand '${identifier}' not found`);
    }

    return {
      ...brand,
      vehicleCount: brand._count.vehicles,
      _count: undefined,
    };
  }

  async create(dto: CreateBrandDto) {
    const slug = dto.slug || this.slugify(dto.name);

    const existing = await this.prisma.brand.findFirst({
      where: { OR: [{ name: dto.name }, { slug }] },
    });

    if (existing) {
      throw new ConflictException(`Brand with this name or slug already exists`);
    }

    return this.prisma.brand.create({
      data: {
        ...dto,
        slug,
      },
    });
  }

  async update(id: string, dto: UpdateBrandDto) {
    await this.findOne(id);

    const slug = dto.slug || (dto.name ? this.slugify(dto.name) : undefined);

    return this.prisma.brand.update({
      where: { id },
      data: {
        ...dto,
        ...(slug ? { slug } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.brand.delete({ where: { id } });
    return { message: `Brand ${id} removed successfully` };
  }
}

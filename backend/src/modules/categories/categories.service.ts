import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
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
    const categories = await this.prisma.category.findMany({
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return categories.map((c) => ({
      ...c,
      vehicleCount: c._count.vehicles,
      _count: undefined,
    }));
  }

  async findOne(identifier: string) {
    const category = await this.prisma.category.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category '${identifier}' not found`);
    }

    return {
      ...category,
      vehicleCount: category._count.vehicles,
      _count: undefined,
    };
  }

  async create(dto: CreateCategoryDto) {
    const slug = dto.slug || this.slugify(dto.name);

    const existing = await this.prisma.category.findFirst({
      where: { OR: [{ name: dto.name }, { slug }] },
    });

    if (existing) {
      throw new ConflictException(`Category with this name or slug already exists`);
    }

    return this.prisma.category.create({
      data: {
        ...dto,
        slug,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);

    const slug = dto.slug || (dto.name ? this.slugify(dto.name) : undefined);

    return this.prisma.category.update({
      where: { id },
      data: {
        ...dto,
        ...(slug ? { slug } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.category.delete({ where: { id } });
    return { message: `Category ${id} removed successfully` };
  }
}

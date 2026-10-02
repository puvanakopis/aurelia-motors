import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateOfferDto, UpdateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async findAll(onlyActive: boolean = true) {
    return this.prisma.offer.findMany({
      where: onlyActive ? { active: true } : {},
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(identifier: string) {
    const offer = await this.prisma.offer.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
    });

    if (!offer) {
      throw new NotFoundException(`Offer '${identifier}' not found`);
    }

    return offer;
  }

  async create(dto: CreateOfferDto) {
    const slug = dto.slug || this.slugify(dto.title);

    const existing = await this.prisma.offer.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new ConflictException(`Offer with slug '${slug}' already exists`);
    }

    return this.prisma.offer.create({
      data: {
        ...dto,
        slug,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  async update(id: string, dto: UpdateOfferDto) {
    await this.findOne(id);

    const slug = dto.slug || (dto.title ? this.slugify(dto.title) : undefined);

    return this.prisma.offer.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        ...(slug ? { slug } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.offer.delete({ where: { id } });
    return { message: `Offer ${id} removed successfully` };
  }
}

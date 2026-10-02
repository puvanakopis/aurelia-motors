import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleFilterDto } from './dto/vehicle-filter.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async findAll(filter: VehicleFilterDto) {
    const {
      page = 1,
      limit = 12,
      search,
      brand,
      category,
      fuelType,
      transmission,
      stockStatus,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      featured,
      sortBy,
    } = filter;

    const where: Prisma.VehicleWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (brand) {
      where.brand = {
        OR: [{ id: brand }, { slug: brand }],
      };
    }

    if (category) {
      where.category = {
        OR: [{ id: category }, { slug: category }],
      };
    }

    if (fuelType) where.fuelType = fuelType;
    if (transmission) where.transmission = transmission;
    if (stockStatus) where.stockStatus = stockStatus;
    if (featured !== undefined) where.featured = featured;

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (minYear !== undefined || maxYear !== undefined) {
      where.year = {};
      if (minYear !== undefined) where.year.gte = minYear;
      if (maxYear !== undefined) where.year.lte = maxYear;
    }

    let orderBy: Prisma.VehicleOrderByWithRelationInput = { createdAt: 'desc' };
    if (sortBy === 'price_asc') orderBy = { price: 'asc' };
    else if (sortBy === 'price_desc') orderBy = { price: 'desc' };
    else if (sortBy === 'year_desc') orderBy = { year: 'desc' };
    else if (sortBy === 'mileage_asc') orderBy = { mileage: 'asc' };
    else if (sortBy === 'newest') orderBy = { createdAt: 'desc' };

    const skip = (page - 1) * limit;

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          brand: true,
          category: true,
          images: {
            orderBy: [{ isPrimary: 'desc' }, { order: 'asc' }],
          },
          specifications: true,
        },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return {
      data: vehicles,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(identifier: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
      include: {
        brand: true,
        category: true,
        images: {
          orderBy: [{ isPrimary: 'desc' }, { order: 'asc' }],
        },
        specifications: true,
        inventory: {
          include: {
            branch: true,
          },
        },
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle '${identifier}' not found`);
    }

    return vehicle;
  }

  async create(dto: CreateVehicleDto) {
    const slug = dto.slug || this.slugify(`${dto.name}-${dto.year}`);

    const existing = await this.prisma.vehicle.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new ConflictException(`Vehicle with slug '${slug}' already exists`);
    }

    const { images, specifications, ...vehicleData } = dto;

    return this.prisma.vehicle.create({
      data: {
        ...vehicleData,
        slug,
        images: images && images.length > 0 ? { create: images } : undefined,
        specifications:
          specifications && specifications.length > 0
            ? { create: specifications }
            : undefined,
      },
      include: {
        brand: true,
        category: true,
        images: true,
        specifications: true,
      },
    });
  }

  async update(id: string, dto: UpdateVehicleDto) {
    await this.findOne(id);

    const { images, specifications, ...vehicleData } = dto;
    const slug = dto.slug || (dto.name ? this.slugify(`${dto.name}-${dto.year || ''}`) : undefined);

    return this.prisma.$transaction(async (tx) => {
      if (images) {
        await tx.vehicleImage.deleteMany({ where: { vehicleId: id } });
        await tx.vehicleImage.createMany({
          data: images.map((img) => ({ ...img, vehicleId: id })),
        });
      }

      if (specifications) {
        await tx.vehicleSpecification.deleteMany({ where: { vehicleId: id } });
        await tx.vehicleSpecification.createMany({
          data: specifications.map((spec) => ({ ...spec, vehicleId: id })),
        });
      }

      return tx.vehicle.update({
        where: { id },
        data: {
          ...vehicleData,
          ...(slug ? { slug } : {}),
        },
        include: {
          brand: true,
          category: true,
          images: {
            orderBy: [{ isPrimary: 'desc' }, { order: 'asc' }],
          },
          specifications: true,
        },
      });
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.vehicle.delete({ where: { id } });
    return { message: `Vehicle ${id} removed successfully` };
  }
}

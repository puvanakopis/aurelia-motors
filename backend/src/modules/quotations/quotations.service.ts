import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateQuotationDto, UpdateQuotationDto } from './dto/create-quotation.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class QuotationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuotationDto, userId?: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: dto.vehicleId },
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle '${dto.vehicleId}' not found`);
    }

    return this.prisma.quotationRequest.create({
      data: {
        ...dto,
        userId: userId || null,
        status: 'DRAFT',
      },
      include: {
        vehicle: true,
      },
    });
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [quotations, total] = await Promise.all([
      this.prisma.quotationRequest.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          vehicle: {
            include: {
              brand: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      this.prisma.quotationRequest.count(),
    ]);

    return {
      data: quotations,
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

  async findOne(id: string) {
    const quotation = await this.prisma.quotationRequest.findUnique({
      where: { id },
      include: {
        vehicle: {
          include: {
            brand: true,
            category: true,
          },
        },
        user: true,
      },
    });

    if (!quotation) {
      throw new NotFoundException(`Quotation request '${id}' not found`);
    }

    return quotation;
  }

  async update(id: string, dto: UpdateQuotationDto) {
    await this.findOne(id);
    return this.prisma.quotationRequest.update({
      where: { id },
      data: {
        ...dto,
        validUntil: dto.validUntil ? new Date(dto.validUntil) : undefined,
      },
      include: {
        vehicle: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.quotationRequest.delete({ where: { id } });
    return { message: `Quotation request ${id} removed successfully` };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateEnquiryDto, UpdateEnquiryDto } from './dto/create-enquiry.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class EnquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEnquiryDto, userId?: string) {
    return this.prisma.enquiry.create({
      data: {
        ...dto,
        userId: userId || null,
        status: 'NEW',
      },
      include: {
        vehicle: {
          select: {
            id: true,
            name: true,
            model: true,
            slug: true,
          },
        },
      },
    });
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [enquiries, total] = await Promise.all([
      this.prisma.enquiry.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          vehicle: true,
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          assignedStaff: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      this.prisma.enquiry.count(),
    ]);

    return {
      data: enquiries,
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
    const enquiry = await this.prisma.enquiry.findUnique({
      where: { id },
      include: {
        vehicle: true,
        user: true,
        assignedStaff: true,
      },
    });

    if (!enquiry) {
      throw new NotFoundException(`Enquiry '${id}' not found`);
    }

    return enquiry;
  }

  async update(id: string, dto: UpdateEnquiryDto) {
    await this.findOne(id);
    return this.prisma.enquiry.update({
      where: { id },
      data: dto,
      include: {
        vehicle: true,
        assignedStaff: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.enquiry.delete({ where: { id } });
    return { message: `Enquiry ${id} removed successfully` };
  }
}

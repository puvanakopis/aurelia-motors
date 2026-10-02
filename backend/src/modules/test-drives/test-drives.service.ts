import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTestDriveDto, UpdateTestDriveDto } from './dto/create-test-drive.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class TestDrivesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTestDriveDto, userId?: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: dto.vehicleId },
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle '${dto.vehicleId}' not found`);
    }

    const branch = await this.prisma.branch.findUnique({
      where: { id: dto.branchId },
    });
    if (!branch) {
      throw new NotFoundException(`Branch '${dto.branchId}' not found`);
    }

    return this.prisma.testDriveRequest.create({
      data: {
        ...dto,
        userId: userId || null,
        status: 'PENDING',
      },
      include: {
        vehicle: true,
        branch: true,
      },
    });
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [testDrives, total] = await Promise.all([
      this.prisma.testDriveRequest.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          vehicle: {
            include: {
              brand: true,
            },
          },
          branch: true,
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
      this.prisma.testDriveRequest.count(),
    ]);

    return {
      data: testDrives,
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
    const testDrive = await this.prisma.testDriveRequest.findUnique({
      where: { id },
      include: {
        vehicle: true,
        branch: true,
        user: true,
        assignedStaff: true,
      },
    });

    if (!testDrive) {
      throw new NotFoundException(`Test drive appointment '${id}' not found`);
    }

    return testDrive;
  }

  async update(id: string, dto: UpdateTestDriveDto) {
    await this.findOne(id);
    return this.prisma.testDriveRequest.update({
      where: { id },
      data: dto,
      include: {
        vehicle: true,
        branch: true,
        assignedStaff: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.testDriveRequest.delete({ where: { id } });
    return { message: `Test drive request ${id} removed successfully` };
  }
}

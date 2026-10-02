import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/create-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(onlyActive: boolean = true) {
    return this.prisma.branch.findMany({
      where: onlyActive ? { active: true } : {},
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
      include: {
        inventory: {
          include: {
            vehicle: true,
          },
        },
      },
    });

    if (!branch) {
      throw new NotFoundException(`Branch '${id}' not found`);
    }

    return branch;
  }

  async create(dto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateBranchDto) {
    await this.findOne(id);
    return this.prisma.branch.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.branch.delete({ where: { id } });
    return { message: `Branch ${id} removed successfully` };
  }
}

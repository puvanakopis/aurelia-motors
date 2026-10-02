import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [
      totalVehicles,
      availableVehicles,
      pendingTestDrives,
      totalTestDrives,
      newEnquiries,
      totalEnquiries,
      pendingQuotations,
      totalBrands,
      totalBranches,
      recentTestDrives,
      recentEnquiries,
      vehiclesValuation,
    ] = await Promise.all([
      this.prisma.vehicle.count(),
      this.prisma.vehicle.count({ where: { stockStatus: 'AVAILABLE' } }),
      this.prisma.testDriveRequest.count({ where: { status: 'PENDING' } }),
      this.prisma.testDriveRequest.count(),
      this.prisma.enquiry.count({ where: { status: 'NEW' } }),
      this.prisma.enquiry.count(),
      this.prisma.quotationRequest.count({ where: { status: 'DRAFT' } }),
      this.prisma.brand.count(),
      this.prisma.branch.count({ where: { active: true } }),
      this.prisma.testDriveRequest.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          vehicle: { select: { id: true, name: true, model: true } },
          branch: { select: { id: true, name: true, city: true } },
        },
      }),
      this.prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          vehicle: { select: { id: true, name: true } },
        },
      }),
      this.prisma.vehicle.aggregate({
        _sum: { price: true },
        _avg: { price: true },
      }),
    ]);

    return {
      metrics: {
        totalVehicles,
        availableVehicles,
        pendingTestDrives,
        totalTestDrives,
        newEnquiries,
        totalEnquiries,
        pendingQuotations,
        totalBrands,
        totalBranches,
        totalInventoryValue: vehiclesValuation._sum.price || 0,
        averageVehiclePrice: Math.round(vehiclesValuation._avg.price || 0),
      },
      recentTestDrives,
      recentEnquiries,
    };
  }
}

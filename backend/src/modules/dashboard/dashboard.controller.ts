import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get overview metrics and recent activity for the salon dashboard' })
  async getStats() {
    return this.dashboardService.getStats();
  }
}

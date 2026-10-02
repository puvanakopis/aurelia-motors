import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TestDrivesService } from './test-drives.service';
import { CreateTestDriveDto, UpdateTestDriveDto } from './dto/create-test-drive.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Public } from '@/common/decorators/public.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('Test Drives')
@Controller('test-drives')
export class TestDrivesController {
  constructor(private readonly testDrivesService: TestDrivesService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Schedule a private test drive appointment' })
  async create(
    @Body() dto: CreateTestDriveDto,
    @CurrentUser('id') userId?: string,
  ) {
    return this.testDrivesService.create(dto, userId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
  @ApiOperation({ summary: 'List all test drive appointments (Staff only)' })
  async findAll(@Query() pagination: PaginationDto) {
    return this.testDrivesService.findAll(pagination);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
  @ApiOperation({ summary: 'Get single test drive appointment' })
  async findOne(@Param('id') id: string) {
    return this.testDrivesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
  @ApiOperation({ summary: 'Update test drive status/notes (Staff only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateTestDriveDto) {
    return this.testDrivesService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete test drive request' })
  async remove(@Param('id') id: string) {
    return this.testDrivesService.remove(id);
  }
}

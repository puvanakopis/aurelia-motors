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
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleFilterDto } from './dto/vehicle-filter.dto';
import { Public } from '@/common/decorators/public.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Filter and paginate vehicles' })
  async findAll(@Query() filter: VehicleFilterDto) {
    return this.vehiclesService.findAll(filter);
  }

  @Public()
  @Get(':identifier')
  @ApiOperation({ summary: 'Get single vehicle by ID or unique slug' })
  async findOne(@Param('identifier') identifier: string) {
    return this.vehiclesService.findOne(identifier);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Create a new vehicle listing (Admin only)' })
  async create(@Body() dto: CreateVehicleDto) {
    return this.vehiclesService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Update vehicle listing (Admin only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete vehicle listing (Admin only)' })
  async remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}

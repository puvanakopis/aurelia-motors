import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/create-brand.dto';
import { Public } from '@/common/decorators/public.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all marques and brands' })
  async findAll() {
    return this.brandsService.findAll();
  }

  @Public()
  @Get(':identifier')
  @ApiOperation({ summary: 'Get brand by ID or slug' })
  async findOne(@Param('identifier') identifier: string) {
    return this.brandsService.findOne(identifier);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Create new brand (Admin only)' })
  async create(@Body() dto: CreateBrandDto) {
    return this.brandsService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Update brand (Admin only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateBrandDto) {
    return this.brandsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete brand (Admin only)' })
  async remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}

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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto, UpdateOfferDto } from './dto/create-offer.dto';
import { Public } from '@/common/decorators/public.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all promotional offers and allocation incentives' })
  @ApiQuery({ name: 'all', required: false, type: Boolean })
  async findAll(@Query('all') all?: string) {
    const onlyActive = all !== 'true';
    return this.offersService.findAll(onlyActive);
  }

  @Public()
  @Get(':identifier')
  @ApiOperation({ summary: 'Get offer by ID or slug' })
  async findOne(@Param('identifier') identifier: string) {
    return this.offersService.findOne(identifier);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Create new promotional offer (Admin only)' })
  async create(@Body() dto: CreateOfferDto) {
    return this.offersService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Update promotional offer (Admin only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateOfferDto) {
    return this.offersService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete offer (Admin only)' })
  async remove(@Param('id') id: string) {
    return this.offersService.remove(id);
  }
}

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
import { QuotationsService } from './quotations.service';
import { CreateQuotationDto, UpdateQuotationDto } from './dto/create-quotation.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Public } from '@/common/decorators/public.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('Quotations')
@Controller('quotations')
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Request bespoke vehicle quotation or financing estimate' })
  async create(
    @Body() dto: CreateQuotationDto,
    @CurrentUser('id') userId?: string,
  ) {
    return this.quotationsService.create(dto, userId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
  @ApiOperation({ summary: 'List all quotation requests (Staff only)' })
  async findAll(@Query() pagination: PaginationDto) {
    return this.quotationsService.findAll(pagination);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
  @ApiOperation({ summary: 'Get quotation request details' })
  async findOne(@Param('id') id: string) {
    return this.quotationsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
  @ApiOperation({ summary: 'Update quotation terms/status (Staff only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateQuotationDto) {
    return this.quotationsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete quotation request' })
  async remove(@Param('id') id: string) {
    return this.quotationsService.remove(id);
  }
}

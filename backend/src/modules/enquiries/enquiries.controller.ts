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
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto, UpdateEnquiryDto } from './dto/create-enquiry.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Public } from '@/common/decorators/public.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('Enquiries')
@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Submit client concierge or vehicle inquiry' })
  async create(
    @Body() dto: CreateEnquiryDto,
    @CurrentUser('id') userId?: string,
  ) {
    return this.enquiriesService.create(dto, userId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
  @ApiOperation({ summary: 'List all client inquiries (Staff only)' })
  async findAll(@Query() pagination: PaginationDto) {
    return this.enquiriesService.findAll(pagination);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
  @ApiOperation({ summary: 'Get inquiry by ID' })
  async findOne(@Param('id') id: string) {
    return this.enquiriesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'MANAGER', 'SALES_STAFF')
  @ApiOperation({ summary: 'Update inquiry status/notes (Staff only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateEnquiryDto) {
    return this.enquiriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete inquiry' })
  async remove(@Param('id') id: string) {
    return this.enquiriesService.remove(id);
  }
}

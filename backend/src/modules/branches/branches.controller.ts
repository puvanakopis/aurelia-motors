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
import { BranchesService } from './branches.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/create-branch.dto';
import { Public } from '@/common/decorators/public.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all showroom salons and branches' })
  @ApiQuery({ name: 'all', required: false, type: Boolean })
  async findAll(@Query('all') all?: string) {
    const onlyActive = all !== 'true';
    return this.branchesService.findAll(onlyActive);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get single branch by ID' })
  async findOne(@Param('id') id: string) {
    return this.branchesService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Create new branch (Admin only)' })
  async create(@Body() dto: CreateBranchDto) {
    return this.branchesService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Update branch (Admin only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
    return this.branchesService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete branch (Admin only)' })
  async remove(@Param('id') id: string) {
    return this.branchesService.remove(id);
  }
}

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnquiryStatus } from '@prisma/client';

export class CreateEnquiryDto {
  @ApiPropertyOptional({ example: 'vehicle-uuid-1' })
  @IsOptional()
  @IsString()
  vehicleId?: string;

  @ApiProperty({ example: 'Alexander Wright' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'alexander@domain.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+94 77 123 4567' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example:
      'Inquiring regarding custom build allocations and bespoke delivery options.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class UpdateEnquiryDto {
  @ApiPropertyOptional({ enum: EnquiryStatus })
  @IsOptional()
  @IsEnum(EnquiryStatus)
  status?: EnquiryStatus;

  @ApiPropertyOptional({ example: 'staff-uuid-1' })
  @IsOptional()
  @IsString()
  assignedStaffId?: string;

  @ApiPropertyOptional({ example: 'Client requested phone callback tomorrow.' })
  @IsOptional()
  @IsString()
  notes?: string;
}

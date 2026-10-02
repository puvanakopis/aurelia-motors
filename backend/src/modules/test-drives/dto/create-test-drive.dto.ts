import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TestDriveStatus } from '@prisma/client';

export class CreateTestDriveDto {
  @ApiProperty({ example: 'vehicle-uuid-1' })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: 'branch-uuid-1' })
  @IsString()
  @IsNotEmpty()
  branchId: string;

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

  @ApiProperty({ example: '2026-10-15' })
  @IsString()
  @IsNotEmpty()
  preferredDate: string;

  @ApiProperty({ example: '11:00 AM' })
  @IsString()
  @IsNotEmpty()
  preferredTime: string;
}

export class UpdateTestDriveDto {
  @ApiPropertyOptional({ enum: TestDriveStatus })
  @IsOptional()
  @IsEnum(TestDriveStatus)
  status?: TestDriveStatus;

  @ApiPropertyOptional({ example: 'staff-uuid-1' })
  @IsOptional()
  @IsString()
  assignedStaffId?: string;

  @ApiPropertyOptional({ example: 'Confirmed with client via telephone.' })
  @IsOptional()
  @IsString()
  notes?: string;
}

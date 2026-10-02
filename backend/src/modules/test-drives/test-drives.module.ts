import { Module } from '@nestjs/common';
import { TestDrivesService } from './test-drives.service';
import { TestDrivesController } from './test-drives.controller';

@Module({
  controllers: [TestDrivesController],
  providers: [TestDrivesService],
  exports: [TestDrivesService],
})
export class TestDrivesModule {}

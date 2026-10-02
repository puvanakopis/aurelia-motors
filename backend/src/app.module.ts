import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BrandsModule } from './modules/brands/brands.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { BranchesModule } from './modules/branches/branches.module';
import { EnquiriesModule } from './modules/enquiries/enquiries.module';
import { TestDrivesModule } from './modules/test-drives/test-drives.module';
import { QuotationsModule } from './modules/quotations/quotations.module';
import { OffersModule } from './modules/offers/offers.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BrandsModule,
    CategoriesModule,
    VehiclesModule,
    BranchesModule,
    EnquiriesModule,
    TestDrivesModule,
    QuotationsModule,
    OffersModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

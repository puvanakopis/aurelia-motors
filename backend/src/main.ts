import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security Headers
  app.use(helmet());

  // CORS Configuration
  app.enableCors({
    origin: [
      configService.get<string>('FRONTEND_URL') || 'http://localhost:3000',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Global Prefix
  app.setGlobalPrefix('api');

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global Error Filter & Interceptors
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Enable Graceful Shutdown Hooks
  app.enableShutdownHooks();

  // Swagger OpenAPI Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Aurelia Motors API')
    .setDescription('Luxury Automotive Showroom & Concierge REST API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Authentication', 'Client and staff authentication endpoints')
    .addTag('Vehicles', 'Showroom vehicle inventory and filtering')
    .addTag('Brands', 'Automotive marques and manufacturers')
    .addTag('Categories', 'Body styles and classifications')
    .addTag('Branches', 'Showroom salons and locations')
    .addTag('Test Drives', 'Appointment bookings and scheduling')
    .addTag('Enquiries', 'Client concierge and consultation inquiries')
    .addTag('Quotations', 'Bespoke vehicle pricing and financing requests')
    .addTag('Offers', 'Curated incentives and promotions')
    .addTag('Users', 'User accounts and RBAC profile management')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT') || 4000;
  await app.listen(port);

  logger.log(`🚀 Aurelia Motors API is running on: http://localhost:${port}/api`);
  logger.log(`📚 Swagger Documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap();

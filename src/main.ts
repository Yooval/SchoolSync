import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundErrorFilter } from './entity-not-found-error.filter';
import { useContainer } from 'class-validator';

/**
 * Entry point for the NestJS application. Responsible for configuring global settings
 * such as validation, filters, and middleware, and starting the application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new EntityNotFoundErrorFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Start the application on port 3000
  await app.listen(3000);
}

// Bootstrap the application
bootstrap();

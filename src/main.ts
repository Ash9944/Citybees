import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const dataSource = app.get(DataSource);
  console.log('Detected Entities:', dataSource.entityMetadatas.map(e => e.name));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

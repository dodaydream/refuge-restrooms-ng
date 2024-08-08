import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new Logger());
  app.enableCors({
    origin: '*'
  })
  await app.listen(3000);
}
bootstrap();

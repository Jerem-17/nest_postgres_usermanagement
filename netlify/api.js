import { NestFactory } from '@nestjs/core';
import { AppModule } from '../dist/app.module';

const createHandler = async (event, context) => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const handler = app.getHttpAdapter().getInstance();
  return handler(event, context);
};

export const handler = createHandler;

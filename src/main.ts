import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DispatchError } from './shared';
import helmet from 'fastify-helmet';
import fastifyRateLimit from 'fastify-rate-limit';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import { CSP } from './shared/config/policy';

const fAdapt = new FastifyAdapter();
const { RATE_LIMIT_MAX, RATE_LIMIT_TIME_WINDOW, SERVICE_PORT, SERVICE_NAME } =
  process.env;

fAdapt.register(fastifyRateLimit, {
  max: Number(RATE_LIMIT_MAX),
  timeWindow: RATE_LIMIT_TIME_WINDOW,
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fAdapt
  );

  app.use(cookieParser());
  app.enableCors();
  app.setGlobalPrefix('api');

  app.register(helmet, CSP);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Base services NESTJS')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('documents', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  app.useGlobalFilters(new DispatchError());

  await app.listen(Number(SERVICE_PORT), '' + SERVICE_NAME);
}

bootstrap();

import 'reflect-metadata';
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
import cookieParser from 'cookie-parser';
import {
  CSP,
  responseNotFound,
  responseRateLimitError,
} from './shared/config/policy-protection';

const prefix = '/api';

const fAdapt = new FastifyAdapter();
const { RATE_LIMIT_MAX, RATE_LIMIT_TIME_WINDOW, SERVICE_PORT, SERVICE_NAME } =
  process.env;

fAdapt.register(fastifyRateLimit, {
  max: Number(RATE_LIMIT_MAX),
  timeWindow: RATE_LIMIT_TIME_WINDOW,
  errorResponseBuilder: responseRateLimitError,
});

fAdapt.register(
  (instance, _options, done) => {
    instance.setNotFoundHandler(function (_request, _reply) {
      _reply.code(404).send(responseNotFound);
    });
    done();
  },
  { prefix }
);

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fAdapt
  );

  app.use(cookieParser());
  app.enableCors();
  app.setGlobalPrefix(prefix);

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

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DispatchError, MessageCodeError } from './shared';
import helmet from 'fastify-helmet';
import fastifyRateLimit from 'fastify-rate-limit';
import cookieParser from 'cookie-parser';
import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';
import {
  CSP,
  responseNotFound,
  responseRateLimitError,
} from './shared/config/policy-protection';

const prefix = '/api';

const fAdapt = new FastifyAdapter();
const {
  RATE_LIMIT_MAX,
  RATE_LIMIT_TIME_WINDOW,
  SERVICE_NAME,
  WHITE_LIST,
} = process.env;

fAdapt.register(fastifyRateLimit, {
  max: Number(RATE_LIMIT_MAX),
  timeWindow: RATE_LIMIT_TIME_WINDOW,
  errorResponseBuilder: responseRateLimitError,
});

fAdapt.register(
  (
    instance: FastifyInstance,
    _: FastifyPluginOptions,
    done: (err?: Error) => void
  ) => {
    instance.setNotFoundHandler((__: FastifyRequest, reply: FastifyReply) => {
      reply.code(HttpStatus.NOT_FOUND).send(responseNotFound);
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

  const whitelist = (WHITE_LIST || '').split(',');

  app.enableCors({
    origin: (origin, callback) => {
      if (origin && !whitelist.includes(origin))
        return callback(new MessageCodeError('cors:notAllowed'));
      callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

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

  await app.listen(8080, SERVICE_NAME || 'localhost');
}

bootstrap();

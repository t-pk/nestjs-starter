import { Test } from '@nestjs/testing';
import { LanguageModule } from '../../src/modules/language/language.module';
import { ValidationPipe } from '@nestjs/common';
import { DispatchError } from '../../src/shared';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { dataExample } from './data-example';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('languages', () => {
  let app: NestFastifyApplication;
  let accessToken = '';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        LanguageModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new DispatchError());

    await app.init();

    app
      .inject({
        method: 'POST',
        url: '/userSession',
        payload: dataExample.userLogin,
      })
      .then((result) => {
        accessToken = JSON.parse(result.payload).accessToken;
      });
  });

  it(`/GET /languages - no params - [200]`, () => {
    return app
      .inject({
        method: 'GET',
        url: '/languages',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
      });
  });

  it(`/GET /languages - params with not exist item - [200]`, () => {
    return app
      .inject({
        method: 'GET',
        url: '/languages',
        query: {
          limit: '5',
          page: '10',
          status: 'true',
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
      });
  });

  it(`/GET /languages - params with exist item - [200] `, () => {
    return app
      .inject({
        method: 'GET',
        url: '/languages',
        query: {
          limit: '20',
          page: '2',
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
      });
  });

  it(`/POST /languages create a language - [201]`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/languages',
        payload: {
          name: 'string',
          iconId: 'string',
          email: 'asdkhadk@gmail.com',
          status: true,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(201);
      });
  });

  it(`/POST /languages create language not property 'name' - [400]`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/languages',
        payload: {
          iconId: 'string',
          email: 'asdkhadk@gmail.com',
          status: true,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(400);
      });
  });

  it(`/DELETE /languages/:id remove a language - [200]`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: '/languages/b63b5865-db89-485f-bc53-9de2f4c6fe79',
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

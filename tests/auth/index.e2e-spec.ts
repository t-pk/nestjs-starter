import { Test } from '@nestjs/testing';
import { AuthModule } from '../../src/modules/auth/auth.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DispatchError } from '../../src/shared';
import { LanguageModule } from '../../src/modules/language/language.module';
import { ValidationPipe } from '@nestjs/common';
import { dataExample } from './data-example';

describe('authentication', () => {
  let app: NestFastifyApplication;
  let token = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, LanguageModule],
    }).compile();
    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new DispatchError());

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    await app
      .inject({
        method: 'POST',
        url: '/userSession',
        payload: dataExample.accountAdmin,
      })
      .then((result) => {
        token = JSON.parse(result.payload);
      });
  });

  it(`/PUT userSession`, () => {
    return app
      .inject({
        method: 'PUT',
        url: '/userSession',
        payload: token,
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
      });
  });

  it(`/PUT userSession`, () => {
    return app
      .inject({
        method: 'PUT',
        url: '/userSession',
        payload: dataExample.sessionInvalidSignature,
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
        expect(JSON.parse(result.payload)).toMatchObject({
          statusCode: 401,
          error: 'Unauthorized',
          message: 'invalid signature',
        });
      });
  });

  it(`/PUT userSession`, () => {
    return app
      .inject({
        method: 'PUT',
        url: '/userSession',
        payload: dataExample.sessionExpired,
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
      });
  });

  it(`[AUTH]: Check ROLES - take 1 api as an example /DELETE languages [403]`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: 'languages/' + dataExample.languageId,
        headers: {
          authorization: 'Bearer ' + (token as any).accessToken,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(403);
      });
  });

  it(`[AUTH]: Check AUTHORIZATION [not use Token] - take 1 api as an example /DELETE languages [401]`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: 'languages/' + dataExample.languageId,
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
      });
  });

  it(`[AUTH]: Check AUTHORIZATION [use Token expired] - take 1 api as an example /DELETE languages [401]`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: 'languages/' + dataExample.languageId,
        headers: {
          authorization: 'Bearer ' + dataExample.accessToken401,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
      });
  });

  it(`[AUTH]: Check ROUTER - take 1 api as an example /DELETE language[s] [404]`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: '/language',
        payload: token,
      })
      .then((result) => {
        expect(result.statusCode).toEqual(404);
      });
  });

  //move module languages
  it(`/POST languages expect 400`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/languages',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(400);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

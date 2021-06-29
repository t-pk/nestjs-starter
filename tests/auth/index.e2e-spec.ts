import { Test } from '@nestjs/testing';
import { AuthModule } from '../../src/modules/auth/auth.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DispatchError } from '../../src/shared';
import { LanguageModule } from '../../src/modules/language/language.module';
import { ValidationPipe } from '@nestjs/common';

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
        payload: {
          username: 'admin',
          password: '12345678',
        },
      })
      .then((result) => {
        token = JSON.parse(result.payload);
      });
  });

  it(`/POST userSession`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/userSession',
        payload: {
          username: 'admin',
          password: '12345678',
        },
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
        payload: token,
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
      });
  });

  it(`/PUT userSession`, () => {
    const sessionExpired = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiNTNlNTQyMjQtN2Y1Zi00M2QxLWE0MmEtMjVjMzBhYmEzMGUyIiwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjI0Nzk5NTA1LCJleHAiOjE2MjQ3OTk1MzV9.xKjVVLb-kxzAqc7zbl8MzyXiLD5Ejy0K4BRFntDQOag',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiNTNlNTQyMjQtN2Y1Zi00M2QxLWE0MmEtMjVjMzBhYmEzMGUyIiwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjI0Nzk5NTA1LCJleHAiOjE2MjQ3OTk1NjV9.zBWJKSkD_is7eLmfo0bMRjw-7H9ZStLoTUi3Dz__Ijk',
    };

    return app
      .inject({
        method: 'PUT',
        url: '/userSession',
        payload: sessionExpired,
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
    const sessionExpired = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiNTNlNTQyMjQtN2Y1Zi00M2QxLWE0MmEtMjVjMzBhYmEzMGUyIiwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjI0Nzk5NTA1LCJleHAiOjE2MjQ3OTk1MzV9.xKjVVLb-kxzAqc7zbl8MzyXiLD5Ejy0K4BRFntDQOag',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiNTNlNTQyMjQtN2Y1Zi00M2QxLWE0MmEtMjVjMzBhYmEzMGUyIiwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjI0Nzk5NTA1LCJleHAiOjE2MjQ3OTk1NjV9.zBWJKSkD_is7eLmfo0bMRjw-7H9ZStLoTUi3Dz__Ijk',
    };

    return app
      .inject({
        method: 'PUT',
        url: '/userSession',
        payload: sessionExpired,
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
      });
  });

  it(`/DELETE languages expect status 401`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: 'languages/b63b5865-db89-485f-bc53-9de2f4c6fe79',
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiNTNlNTQyMjQtN2Y1Zi00M2QxLWE0MmEtMjVjMzBhYmEzMGUyIiwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjI0Nzk5NTA1LCJleHAiOjE2MjQ3OTk1MzV9.xKjVVLb-kxzAqc7zbl8MzyXiLD5Ejy0K4BRFntDQOag',
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
      });
  });

  it(`/DELETE languages expect status 403`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: 'languages/b63b5865-db89-485f-bc53-9de2f4c6fe79',
        headers: {
          authorization: 'Bearer ' + (token as any).accessToken,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(403);
      });
  });

  it(`/DELETE languages expect status 401`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: 'languages/b63b5865-db89-485f-bc53-9de2f4c6fe79',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
      });
  });

  it(`/DELETE language`, () => {
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

  it(`/DELETE languages`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: 'languages/b63b5865-db89-485f-bc53-9de2f4c6fe79',
        headers: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiNDRhNjYxOWUtZjZjMy00MjNhLWI2NjktYTc4MzFlN2Y0MDEzIiwicm9sZXMiOiJBRE1JTiIsImlhdCI6MTYyNDk2OTAwNywiZXhwIjoxNjI0OTY5MDEwfQ.3CjsHU6qGG5Gd-_PKAmobFgLK2W0KcZg4GdevRKojr4'
        }
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
      });
  });

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

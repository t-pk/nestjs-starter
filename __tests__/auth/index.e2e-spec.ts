import { Test } from '@nestjs/testing';
import { AuthModule } from '../../src/modules/auth/auth.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DispatchError } from '../../src/shared';
import { LanguageModule } from '../../src/modules/language/language.module';

describe('authentication', () => {
  let app: NestFastifyApplication;
  let token = {};
  let accessToken = '';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, LanguageModule],
    }).compile();
    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

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
    await app
      .inject({
        method: 'POST',
        url: '/userSession',
        payload: {
          username: 'admin1',
          password: '12345678',
        },
      })
      .then((result) => {
        accessToken = JSON.parse(result.payload).accessToken;
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
          message: 'jwt expired',
        });
      });
  });

  it(`/DELETE languages`, () => {
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

  it(`/DELETE languages`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: 'languages/b63b5865-db89-485f-bc53-9de2f4c6fe79',
        headers: {
          authorization: 'Bearer ' + accessToken,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(403);
      });
  });

  it(`/DELETE languages`, () => {
    return app
      .inject({
        method: 'DELETE',
        url: 'languages/b63b5865-db89-485f-bc53-9de2f4c6fe79',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(401);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

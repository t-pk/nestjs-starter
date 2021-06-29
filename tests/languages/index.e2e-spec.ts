import supertest from 'supertest';
import { Test } from '@nestjs/testing';
import { LanguageModule } from '../../src/modules/language/language.module';
import { INestApplication } from '@nestjs/common';
import { DispatchError } from '../../src/shared';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

describe('languages', () => {
  let app: INestApplication;
  let accessToken = '';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        LanguageModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new DispatchError());

    await app.init();

    supertest(app.getHttpServer())
      .post('/userSession')
      .send({ username: 'user', password: '12345678' })
      .end((_, response) => {
        accessToken = response.body.accessToken;
      });
  });

  it(`/GET /content`, () => {
    return supertest(app.getHttpServer()).get('/languages').expect(200);
  });

  it(`/GET /languages`, () => {
    return supertest(app.getHttpServer()).get('/languages').expect(200);
  });

  it(`/GET /languages`, () => {
    return supertest(app.getHttpServer())
      .get('/languages')
      .query({ limit: 5 })
      .expect(200);
  });

  it(`/GET /languages`, () => {
    return supertest(app.getHttpServer())
      .get('/languages')
      .query({ limit: 5, page: 10, status: true })
      .expect(200);
  });

  it(`/GET /languages`, () => {
    return supertest(app.getHttpServer())
      .get('/languages')
      .query({ limit: 20, page: 2 })
      .expect(200);
  });

  it(`/POST /languages`, () => {
    return supertest(app.getHttpServer())
      .post('/languages')
      .send({
        name: 'string',
        iconId: 'string',
        email: 'asdkhadk@gmail.com',
        status: true,
      })
      .expect(201);
  });

  it(`/POST /languages`, () => {
    return supertest(app.getHttpServer())
      .post('/languages')
      .send({
        iconId: 'string',
        email: 'asdkhadk@gmail.com',
        status: true,
      })
      .expect(400);
  });

  it(`/DELETE /languages/:id`, () => {
    return supertest(app.getHttpServer())
      .delete('/languages/b63b5865-db89-485f-bc53-9de2f4c6fe79')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

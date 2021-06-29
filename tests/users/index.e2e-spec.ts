import supertest from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../../src/modules/user/user.module';
import { INestApplication } from '@nestjs/common';
import { DispatchError } from '../../src/shared';
import { Users } from '../../src/entities';
import { ConfigModule } from '@nestjs/config';

describe('languages', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalFilters(new DispatchError());

    await app.init();
  });

  it(`/POST /users`, () => {
    return supertest(app.getHttpServer())
      .post('/users')
      .send({
        username: 'admin1234',
        password: '123456789',
      })
      .expect(201);
  });

  it(`/POST /users dupplicate`, () => {
    return supertest(app.getHttpServer())
      .post('/users')
      .send({
        username: 'admin1234',
        password: '12345678',
      })
      .expect(400);
  });

  // it(`/POST /users`, () => {
  //   return supertest(app.getHttpServer())
  //     .post('/users')
  //     .send({
  //       username: 'admin',
  //       password: '12345678',
  //     })
  //     .expect(400);
  // });

  afterAll(async () => {
    await Users.destroy({
      where: { username: 'admin1234' },
    });
    await app.close();
  });
});

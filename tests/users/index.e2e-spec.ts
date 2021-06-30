import { Test } from '@nestjs/testing';
import { UsersModule } from '../../src/modules/user/user.module';
import { ValidationPipe } from '@nestjs/common';
import { DispatchError } from '../../src/shared';
import { Users } from '../../src/entities';
import { ConfigModule } from '@nestjs/config';
import { dataExample } from './data-example';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('users', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new DispatchError());

    await app.init();
  });

  it(`/POST /users [201]`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/users',
        payload: dataExample.userRegister,
      })
      .then((result) => {
        expect(result.statusCode).toEqual(201);
      });
  });

  it(`/POST /users create new duplicate [400]`, () => {
    return app
      .inject({
        method: 'POST',
        url: 'users',
        payload: dataExample.userRegister,
      })
      .then((result) => {
        expect(result.statusCode).toEqual(400);
      });
  });

  afterAll(async () => {
    await Users.destroy({
      where: { username: dataExample.userRegister.username },
    });

    await app.close();
  });
});

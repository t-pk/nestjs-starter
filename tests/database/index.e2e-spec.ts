import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DispatchError } from '../../src/shared';
import { DatabaseModule } from '../../src/modules/database/database.module';
import { databaseProvider } from '../../src/modules/database/database.provider';
import { Sequelize } from 'sequelize';

describe('database', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new DispatchError());
    await app.init();
  });

  it(`databse test`, async () => {
    // jest.useFakeTimers();
    process.env.NODE_ENV = 'test';
    expect(await databaseProvider.useFactory()).toBeInstanceOf(Sequelize);
  });

  it(`databse dev`, async () => {
    process.env.NODE_ENV = 'dev';
    expect(await databaseProvider.useFactory()).toBeInstanceOf(Sequelize);
  });

  it(`databse prod`, async () => {
    process.env.NODE_ENV = 'prod';
    expect(await databaseProvider.useFactory()).toBeInstanceOf(Sequelize);
  });

  it(`databse production`, async () => {
    process.env.NODE_ENV = 'production';
    expect(await databaseProvider.useFactory()).toBeInstanceOf(Sequelize);
  });

  it(`databse product`, async () => {
    process.env.NODE_ENV = 'product';
    expect(await databaseProvider.useFactory()).toBeInstanceOf(Sequelize);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(function () {
    jest.useFakeTimers();
  });
});

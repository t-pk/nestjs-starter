import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DispatchError } from '../../src/shared';
import { DatabaseModule } from '../../src/modules/database/database.module';
import { databaseProvider } from '../../src/modules/database/database.provider';
import { Sequelize } from 'sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('Database', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let config: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigService,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new DispatchError());
    config = moduleRef.get(ConfigService);
    await app.init();
  });

  it(`[DATABASE] - test environment`, async () => {
    process.env.NODE_ENV = 'test';

    expect(await databaseProvider.useFactory(config)).toBeInstanceOf(Sequelize);
  });

  it(`[DATABASE] - dev environment`, async () => {
    process.env.NODE_ENV = 'dev';
    expect(await databaseProvider.useFactory(config)).toBeInstanceOf(Sequelize);
  });

  it(`[DATABASE] - prod environment`, async () => {
    process.env.NODE_ENV = 'prod';
    expect(await databaseProvider.useFactory(config)).toBeInstanceOf(Sequelize);
  });

  it(`[DATABASE] - production environment`, async () => {
    process.env.NODE_ENV = 'production';
    expect(await databaseProvider.useFactory(config)).toBeInstanceOf(Sequelize);
  });

  it(`[DATABASE] - product environment`, async () => {
    process.env.NODE_ENV = 'product';
    expect(await databaseProvider.useFactory(config)).toBeInstanceOf(Sequelize);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(function () {
    jest.useFakeTimers();
  });
});

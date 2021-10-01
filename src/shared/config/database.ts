import { IDatabaseConfigAttributes } from './interfaces/data-base.interface';
import { ConfigService } from '@nestjs/config';

type IDBConfig = (configService: ConfigService) => IDatabaseConfigAttributes;

export const databaseConfig: IDBConfig = (configService) => {
  const configBase: IDatabaseConfigAttributes = {
    username: '' + configService.get('DB_USER'),
    password: '' + configService.get('DB_PASSWORD'),
    database: '' + configService.get('DB_NAME'),
    host: '' + configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT')),
    dialect: 'postgres',
    logging: console.log as any,
    force: true,
    timezone: '+07:00',
  };

  const env = '' + configService.get('NODE_ENV');
  switch (env) {
    case 'dev':
    case 'development':
      //configBase.logging = true;
      return configBase;

    case 'test':
      return configBase;

    case 'prod':
    case 'production':
      configBase.dialectOptions = {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };
      return configBase;

    default:
      return configBase;
  }
};

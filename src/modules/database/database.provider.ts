import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
//import * as cls from 'cls-hooked';
import { databaseConfig } from '../../shared/index';

import { Languages, Users } from '../../entities';
import { IDatabaseConfigAttributes } from '../../shared/config/interfaces/data-base.interface';
//const namespace = cls.createNamespace('base-services');

export const databaseProvider = {
  provide: 'SequelizeInstance',
  useFactory: async (): Promise<Sequelize> => {
    let config: IDatabaseConfigAttributes;
    const env = process.env.NODE_ENV?.toLowerCase() || 'local';
    switch (env) {
      case 'dev':
      case 'development':
        config = databaseConfig.development;
        break;

      case 'test':
        config = databaseConfig.test;
        break;

      case 'prod':
      case 'production':
        config = databaseConfig.production;
        break;

      default:
        config = databaseConfig.development;
        break;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //use it(CLS) or unitOfWork function handle threads transaction.
    //Sequelize.useCLS(namespace);

    const sequelize = new Sequelize({ ...(config as SequelizeOptions) });
    sequelize.addModels([Languages, Users]);
    await sequelize.sync({ force: false });

    return sequelize;
  },
};

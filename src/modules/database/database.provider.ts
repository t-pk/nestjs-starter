import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
//import * as cls from 'cls-hooked';
import { databaseConfig } from '../../shared/index';

import { Languages, Users } from '../../entities';
// import { IDatabaseConfigAttributes } from '../../shared/config/interfaces/data-base.interface';
import { ConfigService } from '@nestjs/config';
//const namespace = cls.createNamespace('base-services');

export const databaseProvider = {
  provide: 'SequelizeInstance',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<Sequelize> => {
    const config: SequelizeOptions = databaseConfig(configService);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //use it(CLS) or unitOfWork function handle threads transaction.
    //Sequelize.useCLS(namespace);

    const sequelize = new Sequelize({ ...config });
    sequelize.addModels([Languages, Users]);
    await sequelize.sync({ force: false });

    return sequelize;
  },
};

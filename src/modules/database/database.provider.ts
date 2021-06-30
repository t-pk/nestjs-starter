import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { databaseConfig } from '../../shared/index';
import { Languages, Users } from '../../entities';
import { ConfigService } from '@nestjs/config';

//import * as cls from 'cls-hooked';
//const namespace = cls.createNamespace('base-services');

export const databaseProvider = {
  provide: 'SequelizeInstance',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<Sequelize> => {
    const config: SequelizeOptions = databaseConfig(configService);

    //use it (CLS) or unitOfWork function handle threads transaction.
    //Sequelize.useCLS(namespace);

    const sequelize = new Sequelize({ ...config });
    sequelize.addModels([Languages, Users]);
    await sequelize.sync({ force: false });

    return sequelize;
  },
};

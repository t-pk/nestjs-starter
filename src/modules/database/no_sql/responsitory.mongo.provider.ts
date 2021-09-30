import { Connection } from 'mongoose';
import { Cat, CatSchema } from '../../../schemas/cat.schema';
import { DATABASE_CONNECTION } from './enumuration';

export const catsProviders = {
  provide: Cat.name,
  inject: [DATABASE_CONNECTION],
  useFactory: (connection: Connection): unknown =>
    connection.model(Cat.name, CatSchema),
};

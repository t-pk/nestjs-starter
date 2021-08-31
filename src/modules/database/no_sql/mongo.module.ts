import mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './enumuration';

mongoose.set('debug', true);

export const databaseNoSqlProviders = {
  provide: DATABASE_CONNECTION,
  useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(String(process.env.MONGO_DB)),
};

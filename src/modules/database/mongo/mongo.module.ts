import mongoose from 'mongoose';

mongoose.set('debug', true);

export const databaseProviders = {
  provide: 'DATABASE_CONNECTION',
  useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(String(process.env.MONGO_DB)),
};

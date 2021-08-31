// import mongoose from 'mongoose';

// export const mongoProviders = {
//   provide: 'DATABASE_CONNECTION',
//   useFactory: (): Promise<typeof mongoose> => {
//     const options: mongoose.ConnectOptions = {
//       logger: console.log as any,
//       loggerLevel: 'info',
//       // poolSize: 10,
//     };
//     return mongoose.connect(String(process.env.MONGO_DB), options);
//   },
// };

import util from 'util';
import { Logger, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LanguageModule } from './modules/language/language.module';
import { UsersModule } from './modules/user/user.module';
import { CatsModule } from './modules/cat/cat.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
  const msgMapper = (m: any) => {
    return util.inspect(m, false, 10, true)
      .replace(/\n/g, '').replace(/\s{2,}/g, ' ');
  };
  Logger.log(`\x1B[0;36m[Mongoose]:\x1B[0m: ${collectionName}.${methodName}` + `(${methodArgs.map(msgMapper).join(', ')})`)
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    LanguageModule,
    CatsModule,
    UsersModule,
    MongooseModule.forRoot(String(process.env.MONGO_DB))
  ],
})
export class AppModule {}

import {  Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LanguageModule } from './modules/language/language.module';
import { UsersModule } from './modules/user/user.module';
import { CatsModule } from './modules/cat/cat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    LanguageModule,
    CatsModule,
    UsersModule,
  ],
})
export class AppModule {}

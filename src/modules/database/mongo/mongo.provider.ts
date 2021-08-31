import { Module } from '@nestjs/common';
import { databaseProviders } from './mongo.module';

@Module({
  providers: [databaseProviders],
  exports: [databaseProviders],
})
export class DatabaseModule {}

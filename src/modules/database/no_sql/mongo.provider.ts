import { Module } from '@nestjs/common';
import { databaseNoSqlProviders } from './mongo.module';

@Module({
  providers: [databaseNoSqlProviders],
  exports: [databaseNoSqlProviders],
})
export class DatabaseNoSqlModule {}

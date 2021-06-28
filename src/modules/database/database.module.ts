import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { UnitOfWork } from './UnitOfWork';

@Module({
  providers: [databaseProvider, UnitOfWork],
  exports: [databaseProvider, UnitOfWork],
})
export class DatabaseModule {}

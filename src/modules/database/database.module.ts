import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { databaseProvider } from './database.provider';
import { UnitOfWork } from './UnitOfWork';

@Module({
  providers: [databaseProvider, UnitOfWork, ConfigService],
  exports: [databaseProvider, UnitOfWork],
})
export class DatabaseModule {}

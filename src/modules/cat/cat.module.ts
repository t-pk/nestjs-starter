import { Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.services';
import { catsProviders } from '../database/no_sql/responsitory.mongo.provider';
import { DatabaseNoSqlModule } from '../database/no_sql/mongo.provider';

@Module({
  imports: [DatabaseNoSqlModule],
  controllers: [CatsController],
  providers: [CatsService, catsProviders],
})
export class CatsModule {}

import { Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.services';
import { catsProviders } from '../database/mongo/responsitory.mongo.provider';
import { DatabaseModule } from '../database/mongo/mongo.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, catsProviders],
})
export class CatsModule {}

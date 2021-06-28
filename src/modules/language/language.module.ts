import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { DatabaseModule } from '../database/database.module';
import {
  LanguagesRepository,
} from '../database/repository.database.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    LanguageService,
    LanguagesRepository,
  ],
  controllers: [LanguageController],
})
export class LanguageModule {}

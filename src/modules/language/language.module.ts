import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { DatabaseModule } from '../database/database.module';
import { LanguagesRepository } from '../database/repository.database.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [ConfigService, LanguageService, LanguagesRepository],
  controllers: [LanguageController],
})
export class LanguageModule {}

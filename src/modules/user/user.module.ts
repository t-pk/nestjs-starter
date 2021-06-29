import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from '../database/repository.database.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UsersRepository, ConfigService],
  exports: [UserService],
  controllers: [UserController],
})
export class UsersModule {}

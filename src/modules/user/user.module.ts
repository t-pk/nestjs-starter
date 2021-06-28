import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from '../database/repository.database.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UsersRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UsersModule {}

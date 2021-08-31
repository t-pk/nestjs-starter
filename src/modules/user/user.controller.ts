import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUser } from '../user/dto/';
import { Users } from '../../entities';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(
    @Body() req: CreateUser
  ): Promise<Pick<Users, 'username' | 'roles'>> {
    return await this.userService.register(req);
  }
}

import {
  Controller,
  Post,
  Put,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ISession } from '../../shared/interfaces/session';
import { CreateSession } from './dto/create-session';
import { UpdateSession } from './dto/update-session';
@ApiTags('User Session')
@Controller('userSession')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: CreateSession): Promise<ISession> {
    return this.authService.login(body);
  }

  @Put()
  async updateSession(@Body() tokens: UpdateSession): Promise<ISession> {
    return this.authService.updateSession(tokens);
  }
}

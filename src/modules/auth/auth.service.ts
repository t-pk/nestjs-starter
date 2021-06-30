import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../../entities';
import { verifyHash } from '../../shared/utils/crypto';
import { IUser } from '../../shared/interfaces';
import { ISession } from '../../shared/interfaces/session';
import { UpdateSession } from './dto/update-session';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(username: string, pass: string): Promise<Users | null> {
    const user = await this.usersService.findOne(username);
    if (user && verifyHash(user.password, pass)) {
      user.password = '';
      return user;
    }
    return null;
  }

  async login(user: IUser): Promise<ISession> {
    const userInfo = await this.validateUser(user.username, user.password);
    if (!userInfo) throw new UnauthorizedException();

    const payload: Partial<IUser> = {
      username: userInfo.username,
      sub: userInfo.id,
      roles: userInfo.roles,
    };

    const { accessToken, refreshToken } = this.createSession(payload);
    await this.usersService.updateSession(userInfo.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateSession(tokens: UpdateSession): Promise<ISession> {
    try {
      const userInfo = this.jwtService.verify(tokens.refreshToken);

      const payload: Partial<IUser> = {
        username: userInfo.username,
        sub: userInfo.sub,
        roles: userInfo.roles,
      };

      const { accessToken } = this.createSession(payload);
      return { accessToken, refreshToken: tokens.refreshToken };
    } catch (e) {
      throw e;
    }
  }

  createSession(payload: Partial<IUser>): ISession {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('EXPIRESIN_REFRESH_TOKEN'),
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

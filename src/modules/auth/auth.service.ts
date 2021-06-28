import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../../entities';
import { verifyHash } from '../../shared/utils/crypto';
import { IUser } from '../../shared/interfaces';
import { ISession } from '../../shared/interfaces/session';
import { MessageCodeError } from '../../shared/errors';
import { config } from 'dotenv';
config();

const { EXPIRESIN_REFRESH_TOKEN } = process.env;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
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

  async updateSession(tokens: ISession): Promise<ISession> {
    try {
      const acInfo: string | null | Partial<IUser> = this.jwtService.decode(
        tokens.accessToken
      );

      const reInfo = this.jwtService.verify(tokens.refreshToken);
      if (
        acInfo &&
        !(typeof acInfo === 'string') &&
        reInfo &&
        this.verifySession(acInfo, reInfo) &&
        reInfo.sub
      ) {
        const payload: Partial<IUser> = {
          username: reInfo.username,
          sub: reInfo.sub,
          roles: reInfo.roles,
        };
        const { accessToken } = this.createSession(payload);
        return { accessToken, refreshToken: tokens.refreshToken };
      }

      throw new MessageCodeError('auth:tokenExpired');
    } catch (e) {
      throw new MessageCodeError('auth:tokenExpired');
    }
  }

  verifySession(
    accessInfo: Partial<IUser>,
    refreshInfo: IUser
  ): Required<boolean> {
    return (
      accessInfo.sub === refreshInfo.sub &&
      accessInfo.username === refreshInfo.username &&
      accessInfo.roles === refreshInfo.roles
    );
  }

  createSession(payload: Partial<IUser>): ISession {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: EXPIRESIN_REFRESH_TOKEN,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

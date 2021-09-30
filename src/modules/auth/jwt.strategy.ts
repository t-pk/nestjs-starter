import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { IPayload } from './dto/interfaces';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

config();

const { SECRET_TOKEN } = process.env;
type VPayload = Pick<IPayload, 'sub' | 'username' | 'roles'>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_TOKEN,
    });
  }

  validate(payload: VPayload): Pick<IPayload, 'id' | 'username' | 'roles'> {
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}

export const registerJwt = (): any => {
  return JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get<string>('SECRET_TOKEN'),
        signOptions: {
          expiresIn: configService.get<string>('EXPIRESIN_ACCESS_TOKEN'),
        },
      };
    },
    inject: [ConfigService],
  });
};

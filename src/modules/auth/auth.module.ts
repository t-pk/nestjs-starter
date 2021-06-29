import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();

const { SECRET_TOKEN, EXPIRESIN_ACCESS_TOKEN } = process.env;

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: SECRET_TOKEN,
      signOptions: { expiresIn: EXPIRESIN_ACCESS_TOKEN },
    }),
  ],
  providers: [AuthService, JwtStrategy, ConfigService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

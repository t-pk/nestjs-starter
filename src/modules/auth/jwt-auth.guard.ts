import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/entities';
import { Role } from './roles/roles.enum';
import { ROLES_KEY } from './roles/roles.decorator';
import { TokenExpiredError } from 'jsonwebtoken';

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type RequestType = (err: Error, user: Users, info: unknown, context: ExecutionContext) => any | Users;

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canActivate(context: ExecutionContext): any {
    return super.canActivate(context);
  }

  handleRequest: RequestType = (err, user, info, context) => {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (info && info instanceof TokenExpiredError) throw info;
    // prettier-ignore
    if (err || !user) throw err || new UnauthorizedException();
    // prettier-ignore
    if (!requiredRoles || requiredRoles.includes(user.roles as Role)) return user;

    throw new ForbiddenException();
  };
}

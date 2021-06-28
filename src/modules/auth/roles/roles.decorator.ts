import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const ROLES_KEY = Symbol('ROLES_DECORATOR').toString();

// prettier-ignore
export const Roles = (...roles: Role[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);

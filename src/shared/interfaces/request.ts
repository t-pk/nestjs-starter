import { IUser } from './session';

export interface ParameterDecorator {
  readonly user: IUser;
}

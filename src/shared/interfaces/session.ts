export interface ISession {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IUser {
  readonly username: string;
  readonly password: string;
  readonly id?: string;
  readonly roles?: string;
  readonly sub?: string;
}

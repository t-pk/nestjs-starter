export interface IPayload {
  id?: string;
  username: string;
  roles: string;
  sub?: string;
  iat?: Date;
  exp?: Date;
}

import { Dialect } from "sequelize/types";

export interface IDatabaseConfigAttributes {
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly host: string;
  readonly port: number;
  readonly dialect: Dialect;
  logging: boolean;
  force: boolean;
  timezone: string;
  dialectOptions?: DialectOptions;
}

interface DialectOptions {
  readonly ssl: {
    readonly require: boolean;
    readonly rejectUnauthorized: boolean;
  };
}

export interface IDatabaseConfigAttributes {
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly host: string;
  readonly port: number;
  readonly dialect: string;
  readonly logging: boolean | unknown;
  readonly force: boolean;
  readonly timezone: string;
  readonly dialectOptions?: DialectOptions;
}

export interface IDatabaseConfig {
  readonly development: IDatabaseConfigAttributes;
  readonly test: IDatabaseConfigAttributes;
  readonly production: IDatabaseConfigAttributes;
}

interface DialectOptions {
  readonly ssl: {
    readonly require: boolean;
    readonly rejectUnauthorized: boolean;
  };
}

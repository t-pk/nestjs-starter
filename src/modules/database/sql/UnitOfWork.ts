import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';

@Injectable()
export class UnitOfWork {
  constructor(
    @Inject(forwardRef(() => 'SequelizeInstance'))
    private readonly sequelizeInstance: Sequelize
  ) {}

  async scope<T>(callback: (t: Transaction) => Promise<T>): Promise<T> {
    const isolationLevel = Transaction.ISOLATION_LEVELS.SERIALIZABLE;
    return new Promise<T>((resolve, reject) => {
      this.sequelizeInstance
        .transaction({ isolationLevel }, callback)
        .then((value) => {
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

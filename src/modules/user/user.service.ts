import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ResponseOK, successReponse } from '../../shared/utils/reponse';
import { UnitOfWork } from '../database/UnitOfWork';
import { Users } from './../../entities/';
import { CreateUser } from './dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UnitOfWork)
    private readonly unitOfWork: UnitOfWork,
    @InjectModel(Users)
    private readonly userModel: typeof Users
  ) {}

  async findOne(username: string): Promise<Users | null> {
    return await this.userModel.findOne({
      where: { username },
      raw: true,
    });
  }

  async register(user: CreateUser): Promise<Pick<Users, 'username' | 'roles'>> {
    return this.unitOfWork.scope(async (transaction) => {
      const { username, roles } = await this.userModel.create(user, {
        transaction,
        raw: true,
      });
      return { username, roles };
    });
  }

  async updateSession(userId: string, session: string): Promise<ResponseOK> {
    return this.unitOfWork.scope(async (transaction) => {
      await this.userModel.update(
        { session },
        { where: { id: userId }, transaction }
      );
      return successReponse;
    });
  }
}

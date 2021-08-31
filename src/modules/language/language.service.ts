import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Dictionary } from 'lodash';
import { FindOptions, Model } from 'sequelize/types';
import { paginate, Pagination } from '../../shared';
import { Languages } from '../../entities';
import { UnitOfWork } from '../database/sql/UnitOfWork';
import { ResponseOK, successReponse } from './../../shared/utils/reponse';
import { UpsertLanguage } from './dto';
import { QueryLanguage } from './dto/query-language';

@Injectable()
export class LanguageService {
  constructor(
    @Inject(UnitOfWork)
    private readonly unitOfWork: UnitOfWork,
    @InjectModel(Languages)
    private languageModel: typeof Languages
  ) {}

  public async findLanguages(query: QueryLanguage): Promise<Pagination<Model>> {
    const options: FindOptions = convertQuery(query);
    options.order = [['created_at', 'ASC']];

    return await paginate(this.languageModel, query, options);
  }

  async upsertLanguage(body: UpsertLanguage): Promise<ResponseOK | unknown> {
    return this.unitOfWork.scope(async (transaction) => {
      await this.languageModel.upsert(body, { transaction });
      return successReponse;
    });
  }

  async removeLanguage(id: string): Promise<ResponseOK> {
    return this.unitOfWork.scope(async (transaction) => {
      await this.languageModel.destroy({
        where: { id },
        hooks: true,
        transaction,
        benchmark: true,
        logging: true,
      });
      return successReponse;
    });
  }
}

function convertQuery(query: QueryLanguage) {
  const where: Dictionary<string> = {};
  for (const item of Object.keys(query)) {
    if (['page', 'limit', 'route'].includes(item)) continue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where[item] = (query as any)[item];
  }
  return { where };
}

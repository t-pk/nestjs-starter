import { Languages, Users } from '../../entities';
import { getModelToken } from '@nestjs/sequelize';

export const LanguagesRepository = {
  provide: getModelToken(Languages),
  useValue: Languages,
};

export const UsersRepository = {
  provide: getModelToken(Users),
  useValue: Users,
};

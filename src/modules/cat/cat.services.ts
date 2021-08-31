import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from '../../schemas/cat.schema';
@Injectable()
export class CatsService {
  constructor(
    @Inject('CAT_MODEL')
    private catModel:  Model<Cat>
  ) {}

  async create(createCatDto: any): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}

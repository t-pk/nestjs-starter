// import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../../schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: typeof Cat) {}

  create(): any {
    // const createdCat = new this.catModel(createCatDto);
    // return createdCat.save();
    return true;
  }

  async findAll(): Promise<any> {
    return this.catModel.find().exec();
    // return this.catModel.find().exec();
  }
}

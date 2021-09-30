import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Cat extends Model {
  @Prop({ type: String })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: String })
  productName: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: String })
  client: any;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const CatSchema = SchemaFactory.createForClass(Cat);

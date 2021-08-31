import mongoose from 'mongoose';
import { Document } from 'mongoose';

export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});

export interface Cat extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
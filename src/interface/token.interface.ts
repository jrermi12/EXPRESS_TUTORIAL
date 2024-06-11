// token.interface.ts
import { Document, ObjectId } from 'mongoose';

export interface IToken extends Document {
  token: string;
  userId: ObjectId;
  expires: Date;
  blacklisted: boolean;
  createdAt: Date, 
  updatedAt:Date
}

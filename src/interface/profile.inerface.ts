// profile.interface.ts
import { Document, ObjectId, Schema } from 'mongoose';

export interface IProfile extends Document {
    firstName?: string;
    lastName?: string;
    age?: number,
    addresses?: string;
    email: string,
    phoneNumber?:string,
    userId: Schema.Types.ObjectId;
}

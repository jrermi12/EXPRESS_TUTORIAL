import { Document, Schema } from 'mongoose';
import { IRole } from './roles.interface';

export interface IUser extends Document {
  password: string;
  phoneNumber: string;
  email: string;
  name: string;
  isActive: boolean;
  OTPCode?: string;
  OTPCodeExpires?: number;
  passwordResetCode?: string;
  role: IRole; // Reference to the Role model
}
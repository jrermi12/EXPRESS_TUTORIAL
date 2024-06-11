import { Schema, model } from 'mongoose';
import { IUser } from '../interface/user.interface';

const userSchema = new Schema<IUser>({
  password: {
    type: String,
    select: false,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  OTPCode: {
    type: String,
    select: false,
  },
  OTPCodeExpires: {
    type: Number,
    select: false,
  },
  passwordResetCode: {
    type: String,
    select: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Role is required'],
  },
}, { timestamps: true });

export default model<IUser>('User', userSchema);




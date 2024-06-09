import { Schema, model } from 'mongoose';
import { IUser } from '../interface/user.interface';

const userSchema = new Schema<IUser>({
  password: {
    type: String,
    minlength: [6, 'Password should have at least 6 characters'],
    required: [true, 'Password is required'],
    select: false,
  },
  phoneNumber: {
    type: String,
    unique: true, // Assuming email should be unique
    validate: {
      validator: function(v: string) {
        // Example: Validate if the phone number follows a specific format
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Assuming email should be unique
    validate: {
      validator: function(v: string) {
        // Example: Validate if the email follows a specific format
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
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
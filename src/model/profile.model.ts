import { Schema, model } from 'mongoose';
import { IProfile } from '../interface/profile.inerface';

const profileSchema = new Schema<IProfile>({
    firstName: { 
        type: String,
    },
    lastName: { 
        type: String,
    },
    age: { 
        type: Number,
        min: [0, 'Age cannot be negative'],
    },
    addresses: { 
        type: String,
    },
    email: { 
        type: String,
        required: [true, 'Email is required'],
        unique: true, 
        validate: {
            validator: function(v: string) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    phoneNumber: { 
        type: String,
        unique: true, 
        validate: {
            validator: function(v: string) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'User ID is required'], 
        unique: true, 
        index: true,
    },
}, { timestamps: true });

export default model<IProfile>('Profile', profileSchema);

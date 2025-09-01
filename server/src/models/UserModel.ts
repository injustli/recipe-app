import mongoose from 'mongoose';
import { IUser } from '@/utils/types';

// Defines how a user is stored in the database
const userSchema = new mongoose.Schema<IUser>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    profile: {
      type: String,
      required: true
    },
    lastLoginAt: {
      type: Date,
      default: new Date()
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('Users', userSchema);

export default User;

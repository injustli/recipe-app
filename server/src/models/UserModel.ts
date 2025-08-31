import mongoose from 'mongoose';
import { IUser } from '@utils/types';

// Defines how a user is stored in the database
const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  refreshToken: String,
  refreshTokenExpiry: {
    type: Date,
    required: true
  }
});

const User = mongoose.model<IUser>('Users', userSchema);

export default User;

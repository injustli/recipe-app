import mongoose from 'mongoose';

// Defines how a user is stored in the database
const userSchema = mongoose.Schema(
  {
    email: String,
    name: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('Users', userSchema);

export default User;

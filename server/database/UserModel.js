const mongoose = require('mongoose');

// Defines how a user is stored in the database
const userSchema = mongoose.Schema(
  {
    email: String,
    name: String,
    recipes: [mongoose.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

export const User = model('Users', userSchema);

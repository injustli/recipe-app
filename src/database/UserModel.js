const mongoose = require("mongoose");

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

module.exports = mongoose.model("Users", userSchema, "Users");

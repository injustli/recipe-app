const mongoose = require('mongoose');

// Defines how a recipe is stored in the database
const recipeSchema = mongoose.Schema(
  {
    name: String,
    ingredients: [String],
    method: [String],
    imageUrl: String,
    createdBy: String,
    time: Number,
  },
  {
    timestamps: true,
  }
);

export const Recipe = model('Recipes', recipeSchema);

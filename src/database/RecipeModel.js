const mongoose = require('mongoose');

// Defines how a recipe is stored in the database
const recipeSchema = mongoose.Schema(
  {
    name: String,
    ingredients: [String],
    method: [String],
    imageID: mongoose.Types.ObjectId,
    createdBy: String,
    time: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipes', recipeSchema, 'Recipes');

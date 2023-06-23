const mongoose = require("mongoose");

// Defines how a recipe is stored in the database
const recipeSchema = mongoose.Schema(
  {
    name: String,
    ingredients: Array,
    method: Array,
    imageID: mongoose.Types.ObjectId,
    createdBy: String,
    time: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipes", recipeSchema, "Recipes");

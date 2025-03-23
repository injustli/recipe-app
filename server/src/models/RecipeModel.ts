import mongoose from 'mongoose';
import { IRecipe } from '@utils/types';

// Defines how a recipe is stored in the database
const recipeSchema = new mongoose.Schema<IRecipe>(
  {
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    method: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    createdBy: { type: String, required: true },
    time: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const Recipe = mongoose.model<IRecipe>('Recipes', recipeSchema);

export default Recipe;

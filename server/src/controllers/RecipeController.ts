import asyncHandler from 'express-async-handler';
import Recipe from '@/models/RecipeModel';
import { uploadImage } from '@/database/Storage';
import { Request, Response } from 'express';

interface RecipeQuery {
  name?: { $regex: string; $options: string };
  time?: { $gte: number; $lte: number };
  ingredients?: { $elemMatch: { $in: string[] } };
  createdBy?: { $regex: string; $options: string };
}

// @desc   Gets recipes from the database based on user query parameters
// @route  GET /api/recipes
// @access public
export const fetchRecipes = asyncHandler(
  async (req: Request, res: Response) => {
    const { ingredients, user, name } = req.query;
    if (!req.query.page && !req.query.limit) {
      throw new Error(`page and limit query parameters weren't set!`);
    }

    const query = {} as RecipeQuery;

    const page = Number(req.query.page as string);
    const limit = Number(req.query.limit as string);
    const minTime = Number(req.query.minTime as string);
    const maxTime = Number(req.query.maxTime as string);

    if (name) {
      query['name'] = { $regex: name as string, $options: 'i' };
    }
    if (minTime && maxTime) {
      query['time'] = { $gte: minTime, $lte: maxTime };
    }
    if (ingredients) {
      query['ingredients'] = { $elemMatch: { $in: ingredients as string[] } };
    }
    if (user) {
      query['createdBy'] = { $regex: user as string, $options: 'i' };
    }
    const recipes = await Recipe.find(query)
      .select('_id name ingredients method imageID createdBy time imageUrl')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const count = await Recipe.find(query).countDocuments().exec();
    res.status(200).json({ data: recipes, totalCount: count });
  }
);

// @desc   Adds a recipe under the currently logged in user
// @route  POST /api/recipes
// @access private: Logged in user can only add recipes under their name
export const addRecipe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body) {
    throw new Error('Body missing from request!');
  }
  if (!req.file) {
    throw new Error(`An image file wasn't uploaded!`);
  }
  const { name, ingredients, method, time, createdBy } = req.body;
  const url = await uploadImage(req.file);
  console.log(url);
  const recipe = await Recipe.create({
    name,
    imageUrl: url,
    ingredients,
    method,
    time,
    createdBy
  });
  if (!recipe) {
    throw new Error('Error occurred in creating new recipe');
  }
  res.status(200).send('New recipe succesfully created!');
});

// @desc   Deletes a recipe under the currently logged in user
// @route  DELETE /api/recipes
// @access private: Logged in user can only delete recipes under their name
export const deleteRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new Error('Recipe id missing from query parameters!');
    }
    const recipe = await Recipe.findByIdAndDelete({ _id: id });
    if (!recipe) {
      throw new Error('Error occurred in deleting recipe!');
    }
    res.status(200).send('Recipe successfully removed from database!');
  }
);

// @desc   Modifies a recipe under the currently logged in user
// @route  PUT /api/recipes
// @access private: Logged in user can only edit recipes under their name
export const modifyRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body) {
      throw new Error('Body missing from request!');
    }
    const { id } = req.params;
    if (!id) {
      throw new Error('Recipe id missing from request parameters!');
    }
    const recipe = await Recipe.findByIdAndUpdate({ _id: id }, req.body, {
      new: true
    });
    if (!recipe) {
      throw new Error('Error occurred in updating recipe!');
    }
    res.status(200).send('Recipe succesfully updated!');
  }
);

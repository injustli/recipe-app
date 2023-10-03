const express = require('express');
const router = express.Router();
const {
  fetchRecipes,
  addRecipe,
  modifyRecipe,
  deleteRecipe,
} = require('../controllers/RecipeController');

// @desc   Gets recipes from the database based on user query parameters
// @route  GET /recipes
// @access public
router.get('/', fetchRecipes);

// @desc   Adds a recipe under the currently logged in user
// @route  POST /recipes
// @access private: Logged in user can only add recipes under their name
router.post('/', addRecipe);

// @desc   Modifies a recipe under the currently logged in user
// @route  PUT /recipes
// @access private: Logged in user can only edit recipes under their name
router.put('/:id', modifyRecipe);

// @desc   Deletes a recipe under the currently logged in user
// @route  DELETE /recipes
// @access private: Logged in user can only delete recipes under their name
router.delete('/', deleteRecipe);

module.exports = router;

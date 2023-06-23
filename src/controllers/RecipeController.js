const asyncHandler = require("express-async-handler");
const Recipe = require("../database/RecipeModel");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

// Used for verification
const verify = asyncHandler(async (token, email) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  return payload.email == email;
});

// @desc   Gets recipes from the database based on user query parameters
// @route  GET /recipes
// @access public
const fetchRecipes = asyncHandler(async (req, res) => {
  const {minTime, maxTime, page, limit, ingredients, user, name} = req.query;
  if (!page && !limit) {
    res.status(400);
    throw new Error("page and limit query parameters weren't set!");
  }

  const query = {};

  if (name) {
    query["name"] = {$regex: name};
  }
  if (minTime !== "0" && maxTime !== "0") {
    query["time"] = {$gte: minTime, $lte: maxTime};
  } else if (minTime === "0" && maxTime !== "0") {
    query["time"] = {$lte: maxTime};
  } else if (minTime !== "0" && maxTime === "0") {
    query["time"] = {$gte: minTime};
  }
  if (ingredients) {
    query["ingredients"] = {$elemMatch: {$in: ingredients}};
  }
  if (user) {
    query["createdBy"] = user;
  }
  const recipes = await Recipe
    .find(query)
    .select("_id name ingredients method imageID createdBy time")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  const count = await Recipe.estimatedDocumentCount();
  res.status(200).json({data: recipes, totalCount: count});
});

// @desc
// @route  
// @access 
const addRecipe = asyncHandler(async (req, res) => {

});

// @desc
// @route
// @access
const deleteRecipe = asyncHandler(async (req, res) => {

});

// @desc
// @route
// @access
const modifyRecipe = asyncHandler(async (req, res) => {

});

module.exports = {
  fetchRecipes,
  addRecipe,
  deleteRecipe,
  modifyRecipe,
}

const express = require("express");
const router = express.Router();
const {
  fetchRecipes, addRecipe, modifyRecipe, deleteRecipe
} = require("../controllers/RecipeController");

router.get("/", fetchRecipes);
router.post("/", addRecipe);
router.put("/", modifyRecipe);
router.delete("/", deleteRecipe);

module.exports = router;

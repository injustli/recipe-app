const asyncHandler = require("express-async-handler");
const User = require("../database/UserModel");

// @desc   Adds new user if it doesnt exist and returns newly created user, otherwise return existing user from database
// @route  PUT /users
// @access Public
const addOrUpdateUser = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  // Finds a user based off email and name and returns an object with only the id, email, name, recipes fields
  let user = await User.findOne({ email: email, name: name }, "_id email name recipes").exec();
  if (user) {
    res.status(200).json({ 
      data: user, 
      message: "User already exists. Returning user information" 
    });
  } else {
    user = await User.create({ email: email, name: name, recipes: [] });
    if (user) {
      res.status(200).json({
        data: {
          _id: user._id,
          email: user.email,
          name: user.name,
          recipes: user.recipes,
        },
        message: "New user created successfully!"
      });
    } else {
      res.status(400);
      throw new Error("Error in user creation!");
    }
  }
});

module.exports = {
  addOrUpdateUser,
}

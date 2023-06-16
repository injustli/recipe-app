const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const express = require("express");
const app = express();
const {addUser, findUser} = require("./database/UserEntity");
const dotenv = require("dotenv");
const {OAuth2Client} = require("google-auth-library");
// const {getRecipes, addRecipes, deleteAllRecipes} = require("./database/RecipeEntity");

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

app.use(helmet());

app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.use(morgan("combined"));

// Used by certain endpoints for verification
async function verify(token, email) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  return payload.email == email;
}

// Test API method 
app.get("/test", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/users", async (req, res) => {
  const user = await findUser(req.body);
  if (user) {
    //const updatedUser = await updateUser(user);
    res.status(200).send({data: user, message: "Updated user successfully"});
  } else {
    const newUser = await addUser(req.body);
    (newUser) ?
      res.status(200).send({data: newUser, message: "Created new user successfully"}) :
      res.status(400).send({message: "Couldn't add a new user"});
  }
});

app.get("/recipes", async (req, res) => {
  /*
  if (!req.query.limit || !req.query.page) {
    res.status(400).send({message: "Missing limit and/or page query parameters!"});
  }
  const recipes = await getRecipes(req.query);
  res.status(200).send({recipes: recipes[0], totalCount: recipes[1], all: recipes[2]});
  */
});


app.post("/recipes", (req, res) => {

});

app.delete("/recipes", (req, res) => {

});

app.put("/recipes", (req, res) => {

});

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
module.exports = app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

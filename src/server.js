const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const connectDB = require("./database/Config");
const userRoutes = require("./routes/UserRoutes");
const recipeRoutes = require("./routes/RecipeRoutes");

connectDB();

const app = express();

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  res.status(200).json({ message: "Hello World!" });
});

app.use(express.static(path.join(path.resolve(), "/build")));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(path.resolve(), "build", "index.html"));
});

app.use("/users", userRoutes);

app.use("/recipes", recipeRoutes);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

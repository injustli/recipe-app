const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
require('dotenv').config();
const connectDB = require('./database/Config');
const userRoutes = require('./routes/UserRoutes');
const recipeRoutes = require('./routes/RecipeRoutes');

connectDB();

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test API method
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/users', userRoutes);

app.use('/recipes', recipeRoutes);

app.use(express.static(path.join(path.resolve(), '/build')));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(path.resolve(), 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

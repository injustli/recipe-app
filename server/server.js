const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
require('dotenv').config();
const connectDB = require('./database/Config');
//const userRoutes = require('./routes/UserRoutes');
const recipeRoutes = require('./routes/RecipeRoutes');
const authRoutes = require('./routes/AuthRoutes.js');
const multer = require('multer');
const cors = require('cors');

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test API method
app.get('/api/test', (_, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

//app.use('/api/users', userRoutes);

app.use('/api/recipes', multerMid.single('file'), recipeRoutes);

app.use('/api/auth/google', authRoutes);

app.use(express.static(path.join(path.resolve(), '/build')));

app.get('*', function (_, res) {
  res.sendFile(path.resolve(path.resolve(), 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

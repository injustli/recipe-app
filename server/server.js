import bodyParser from 'body-parser';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/Config.js';
import recipeRoutes from './routes/RecipeRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import multer from 'multer';
import cors from 'cors';

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test API method
app.get('/api/test', (_, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api/users', userRoutes);

app.use('/api/recipes', multerMid.single('file'), recipeRoutes);

app.use('/api/auth/google', authRoutes);

if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(path.resolve(), '/build')));

  app.get('*', (_, res) => {
  res.sendFile(path.resolve(path.resolve(), 'build', 'index.html'));
});
}

app.listen(process.env.PORT || 8080, async () => {
  await connectDB();
  console.log(`Listening on port ${process.env.PORT || 8080}!`);
});

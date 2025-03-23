import bodyParser from 'body-parser';
import express, { Response } from 'express';
import connectDB from '@database/Config';
import recipeRoutes from '@routes/RecipeRoutes';
import authRoutes from '@routes/AuthRoutes';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

const app = express();

// TODO: Remove unnecessary body parser
// TODO: Add error middleware that maps exceptions to non 500 error status codes
// TODO: Remove unnecessary user routes and user controller files
// TODO: Remove Calendar.js for now
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Test API method
app.get('/api/test', (res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api/recipes', multerMid.single('file'), recipeRoutes);

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 8080, async () => {
  await connectDB();
  console.log(`Listening on port ${process.env.PORT || 8080}!`);
});

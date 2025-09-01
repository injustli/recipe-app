import asyncHandler from 'express-async-handler';
import User from '@/models/UserModel';
import { Request, Response } from 'express';

// @desc   Returns authenticated user
// @route  POST /api/auth/google/authenticate
// @access public
export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Verify the Firebase ID token
    const decodedToken = req.user;
    const { uid, email, name, picture } = decodedToken;

    // Use "upsert" to find the user or create them if they don't exist
    const user = await User.findOneAndUpdate(
      { uid },
      {
        $set: {
          email,
          name,
          profile: picture,
          lastLoginAt: new Date()
        }
      },
      {
        new: true, // Return the updated document
        upsert: true // Create a new document if one doesn't exist
      }
    );

    console.log(`User ${user.email} verified and saved/updated in DB.`);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error verifying token or saving user to DB:', error);
    throw new Error('Invalid or expired token');
  }
});

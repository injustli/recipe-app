import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import serviceAccount from '@/firebase-service-account.json';
import admin, { ServiceAccount } from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

// Middleware to be used to validate token and add token to req.user
export const validateMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized: No token provided');
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      // Verify the ID token using the Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken; // Add the decoded token to the request object
      next();
    } catch (error) {
      console.log('Error while verifying Firebase ID token:', error);
      throw new Error('Unauthorized: Invalid token');
    }
  }
);

import asyncHandler from 'express-async-handler';
import fetch from 'node-fetch';
import User from '../database/UserModel.js';
import { jwtDecode } from 'jwt-decode';

// @desc   Adds new user if it doesnt exist and returns newly created user,
//         otherwise return existing user from database. A unique user is
//         defined by its email since every Google Account must have a unique
//         email address.
export const addOrUpdateUser = async (userInfo) => {
  const { email, name } = userInfo;
  // Finds a user based off email and name and returns an object with only the
  // id, email, name fields
  let user = await User.findOne({ email }, '_id email name').exec();
  if (user) {
    return {
      data: user,
      message: 'User already exists. Returning user information',
    };
  } else {
    user = await User.create({ email, name, recipes: [] });
    if (user) {
      return {
        data: {
          _id: user._id,
          email,
          name,
        },
        message: 'New user created successfully!',
      };
    } else {
      throw new Error('Error in user creation!');
    }
  }
};

export const fetchTokens = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Body missing from request!');
  }
  const { code } = req.body;
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const redirect_uri =
    process.env.NODE_ENV === 'test'
      ? 'http://localhost:8080'
      : process.env.REDIRECT_URI;
  const grant_type = 'authorization_code';

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type,
    }),
  });
  const data = await response.json();
  const user = await addOrUpdateUser(jwtDecode(data.id_token));
  res.status(200).json({ tokens: data, user });
});

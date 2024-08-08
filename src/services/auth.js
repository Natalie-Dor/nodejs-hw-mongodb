import crypto from 'node:crypto';

import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from '../constants/index.js';

async function registerUser(user) {
  const maybeUser = await User.findOne({ email: user.email });
  if (maybeUser !== null) {
    throw createHttpError(409, 'Email in use');
  }
  user.password = await bcrypt.hash(user.password, 10);

  return User.create(user);
}

async function loginUser(email, password) {
  const maybeUser = await User.findOne({ email });

  if (maybeUser === null) {
    throw createHttpError(404, 'User not found');
  }
  const isMatch = await bcrypt.compare(password, maybeUser.password);

  if (isMatch === false) {
    throw createHttpError(401, 'Unauthorize');
  }

  await Session.deleteOne({ userId: maybeUser._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId: maybeUser._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
}

function logoutUser(sessionId) {
  return Session.deleteOne({ _id: sessionId });
}
export { registerUser, loginUser, logoutUser };

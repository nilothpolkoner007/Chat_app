import User from '../models/User.js';
import { ERROR_MESSAGES } from '../config/constants.js';

export const createUser = async (userData) => {
  const userExists = await User.findOne({ email: userData.email });
  if (userExists) {
    throw new Error(ERROR_MESSAGES.USER_EXISTS);
  }
  return User.create(userData);
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }
  return user;
};

export const updateUserStatus = async (id, isOnline) => {
  const user = await User.findByIdAndUpdate(id, { isOnline, lastSeen: new Date() }, { new: true });
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }
  return user;
};

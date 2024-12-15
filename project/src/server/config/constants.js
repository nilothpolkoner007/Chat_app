export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat_app';

export const VALIDATION = {
  MIN_AGE: 13,
  PASSWORD_MIN_LENGTH: 6,
};

export const ERROR_MESSAGES = {
  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  SERVER_ERROR: 'Server error occurred',
};

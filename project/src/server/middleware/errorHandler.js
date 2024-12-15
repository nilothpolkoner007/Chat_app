import { ERROR_MESSAGES } from '../config/constants';
import AppError from '../utils/AppError'; // Import AppError class

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const isDev = process.env.NODE_ENV === 'development';

  // Check if error is an instance of AppError (custom error class)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Handle other error types (e.g., ValidationError, UnauthorizedError)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: ERROR_MESSAGES.VALIDATION_ERROR });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }

  // Default to internal server error for unhandled errors
  res.status(500).json({
    message: ERROR_MESSAGES.SERVER_ERROR,
    ...(isDev && { stack: err.stack }), // Include stack trace in development mode
  });
};

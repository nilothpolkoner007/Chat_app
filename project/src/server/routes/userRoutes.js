import express from 'express';
import { check } from 'express-validator';
import { registerUser, getUsers, updateUserStatus } from '../controllers/userController.js';

const router = express.Router();

// Validation middleware
const validateUser = [
  check('name').notEmpty().withMessage('Name is required'),
  check('age').isInt({ min: 13 }).withMessage('Age must be at least 13'),
  check('nickname').notEmpty().withMessage('Nickname is required'),
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('choice').notEmpty().withMessage('Choice is required'),
  check('hobby').notEmpty().withMessage('Hobby is required'),
];

router.post('/', validateUser, registerUser);
router.get('/', getUsers);
router.put('/:id/status', updateUserStatus);

export default router;
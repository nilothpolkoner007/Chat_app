const { check } = require('express-validator');
const { VALIDATION } = require('../config/constants');

const userValidationRules = [
  check('name').trim().notEmpty().withMessage('Name is required'),
  check('age')
    .isInt({ min: VALIDATION.MIN_AGE })
    .withMessage(`Age must be at least ${VALIDATION.MIN_AGE}`),
  check('nickname').trim().notEmpty().withMessage('Nickname is required'),
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('choice').trim().notEmpty().withMessage('Choice is required'),
  check('hobby').trim().notEmpty().withMessage('Hobby is required'),
];

import User from '../models/User.js';
import { validationResult } from 'express-validator';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, age, nickname, email, instaId, fbId, choice, hobby } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      age,
      nickname,
      email,
      instaId,
      fbId,
      choice,
      hobby,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        isOnline: user.isOnline,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-email');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user online status
// @route   PUT /api/users/:id/status
// @access  Public
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isOnline } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isOnline = isOnline;
    user.lastSeen = new Date();
    await user.save();

    res.json({ isOnline: user.isOnline, lastSeen: user.lastSeen });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

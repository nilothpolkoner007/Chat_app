import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [13, 'Must be at least 13 years old'],
  },
  nickname: {
    type: String,
    required: [true, 'Nickname is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
  },
  instaId: String,
  fbId: String,
  choice: {
    type: String,
    required: [true, 'Choice is required'],
  },
  hobby: {
    type: String,
    required: [true, 'Hobby is required'],
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('email')) {
    next();
  }
  // Hash email for security
  const salt = await bcrypt.genSalt(10);
  this.email = await bcrypt.hash(this.email, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
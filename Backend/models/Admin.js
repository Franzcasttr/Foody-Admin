import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import validator from 'validator';

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlegth: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid',
    },
    unique: true,
  },
  profileimage: {
    type: String,
    default:
      'https://res.cloudinary.com/dyvisacbu/image/upload/v1645840789/food-denx/user/user-profile_xzivwt.png',
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    select: false,
    minlength: 6,
  },
  role: {
    type: String,
    default: 'admin',
  },
});

AdminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model('Admin', AdminSchema);

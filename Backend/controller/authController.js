import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import Token from '../models/Token.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequest, UnAuthenticatedError } from '../errors/index.js';
import createTokenUser from '../utils/createTokenUser.js';
import { verificationEmail } from '../utils/verificationToken.js';
import { uploadImage } from '../utils/uploadImage.js';
import { Resetverification } from '../utils/resetPasswordVerification.js';
import createHash from '../utils/createHash.js';

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name, !email, !password)) {
    throw new BadRequest('Please provide all values');
  }
  const emailAlreadyExist = await User.findOne({ email });

  if (emailAlreadyExist) {
    throw new BadRequest('Email already in use');
  }

  const verificationToken = nanoid(64);

  const user = await User.create({ name, email, password, verificationToken });
  const origin = 'https://foody-17af1.web.app';

  verificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Success! Please check your email to verify account' });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticatedError('Verification Failed');
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnAuthenticatedError('Verification Failed');
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email verified' });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const { jwt: cookie } = req.signedCookies;

  if (!email || !password) {
    throw new BadRequest('Please provide all values');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  if (!user.isVerified) {
    throw new UnAuthenticatedError('Please verify your email');
  }
  const tokenUser = createTokenUser(user);

  let refreshToken;

  const accessToken = jwt.sign({ user: tokenUser }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  const newRefreshToken = jwt.sign(
    { user: tokenUser },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '1d' }
  );

  if (cookie) {
    await Token.findOneAndDelete({ refreshToken: cookie });
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: 'None',
    });
  }

  refreshToken = newRefreshToken;

  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: 'None',

    maxAge: 1000 * 60 * 60 * 24,
  });

  user.password = undefined;
  res.status(StatusCodes.OK).json({ accessToken });
};

const updateUser = async (req, res) => {
  const { fullname } = req.body;
  let userImage;
  if (!req.files) {
    User.findOneAndUpdate(
      { _id: req.user.userID },
      { name: fullname },
      { returnDocument: 'after' }
    ).exec((error, result) => {
      if (error) {
        throw new BadRequest('Something went wrong please try again');
      }
      if (result) {
        res.status(StatusCodes.OK).json({ result });
      }
    });
  } else {
    userImage = req.files.image;
    const maxSize = 1024 * 1024;

    if (userImage.size > maxSize) {
      throw new BadRequest('Please upload image lower than 1mb');
    }
    if (!userImage.mimetype.startsWith('image')) {
      throw new BadRequest('Please upload an image');
    }

    const images = await uploadImage(userImage);
    User.findOneAndUpdate(
      { _id: req.user.userID },
      { name: fullname, profileimage: images },
      { returnDocument: 'after' }
    ).exec((error, result) => {
      if (error) {
        throw new BadRequest('Something went wrong please try again');
      }
      if (result) {
        res.status(StatusCodes.OK).json({ result });
      }
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest('Please enter your email address');
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = nanoid(64);
    const origin = 'https://foody-17af1.web.app';

    await Resetverification({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;

    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Please check your email for reset link' });
  }
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  if (!token || !email) {
    throw new BadRequest('Something went wrong');
  }

  if (!password) {
    throw new BadRequest('Please provide a password');
  }

  const user = await User.findOne({ email });
  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;

      await user.save();

      res.status(200).json({ msg: 'Password reset successfully' });
    } else {
      throw new BadRequest('Invalid request');
    }
  }
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userID });
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: 'None',
  });

  res.status(StatusCodes.OK).json({ msg: 'You successfully logout' });
};
export {
  userRegister,
  userLogin,
  logout,
  verifyEmail,
  updateUser,
  uploadImage,
  forgotPassword,
  resetPassword,
};

import jwt from 'jsonwebtoken';
import Admin from '../../models/Admin.js';
import AdminToken from '../../models/AdminToken.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequest, UnAuthenticatedError } from '../../errors/index.js';
import createTokenUser from '../../utils/createTokenUser.js';

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const { jwt: cookie } = req.signedCookies;

  if (!email || !password) {
    throw new BadRequest('Please provide all values');
  }

  const user = await Admin.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const tokenUser = createTokenUser(user);

  let refreshToken;

  const accessToken = jwt.sign({ user: tokenUser }, process.env.JWT_SECRET, {
    expiresIn: '5m',
  });

  const newRefreshToken = jwt.sign(
    { user: tokenUser },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '1d' }
  );

  if (cookie) {
    await AdminToken.findOneAndDelete({ refreshToken: cookie });
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

  await AdminToken.create(userToken);

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

export const adminLogout = async (req, res) => {
  await AdminToken.findOneAndDelete({ user: req.user.userID });
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: 'None',
  });

  res.status(StatusCodes.OK).json({ msg: 'You successfully logout' });
};

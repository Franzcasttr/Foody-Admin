import jwt from 'jsonwebtoken';

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

// console.log(isTokenValid);
const attachCookies = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });
  const short = 1000 * 60 * 15;
  const oneday = 1000 * 60 * 60 * 24;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: true,
    // secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'None',
    // expires: new Date(Date.now() + short),
    // maxAge: short,
    maxAge: 1000,
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: 'None',
    expires: new Date(Date.now() + oneday),
  });
};

export { attachCookies, createJWT, isTokenValid };

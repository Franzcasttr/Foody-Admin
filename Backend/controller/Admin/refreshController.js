import AdminToken from '../../models/AdminToken.js';
import jwt from 'jsonwebtoken';

export const adminRefreshTokenHandler = async (req, res) => {
  const cookie = req.signedCookies;
  if (!cookie.jwt) return res.sendStatus(401);
  const refreshToken = cookie.jwt;

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: 'None',
  });

  const foundToken = await AdminToken.findOne({ refreshToken });

  if (!foundToken) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (error, decoded) => {
        if (error) {
          console.log('first error');
          return res.sendStatus(403);
        }

        const hackedToken = await AdminToken.findOneAndDelete({
          user: decoded.user.userID,
        });
      }
    );
    return res.sendStatus(403);
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (error, decoded) => {
      if (error) {
        console.log('second error');
        return res.sendStatus(403);
      }

      const { userID, role } = decoded.user;
      const user = { user: { userID, role } };
      const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '5m',
      });
      const newRefreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '1d',
      });
      foundToken.refreshToken = newRefreshToken;
      await foundToken.save();

      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'None',
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(200).json({ accessToken });
    }
  );
};

import { UnAuthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const authenicateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      if (decoded) {
        req.user = decoded.user;
        next();
      } else {
        return res.sendStatus(401);
      }
    });
  }
  // }
};
export default authenicateUser;

export const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      if (decoded.user.role === 'admin' || 'superadmin') {
        req.user = decoded.user;
        next();
      } else {
        return res.sendStatus(401);
      }
    });
  }
};

export const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (req.user.role !== 'superadmin') {
      res
        .status(401)
        .json({ msg: 'Sorry! you are not allowed to make this action' });
    }

    if (!roles.includes(req.user.role)) {
      throw new UnAuthenticatedError('Unauthorize to access this route');
    }
    next();
  };
};

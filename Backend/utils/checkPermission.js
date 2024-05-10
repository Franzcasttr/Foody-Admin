import { UnAuthenticatedError } from '../errors/index.js';

const checkpersmission = async (requestUser, reqresourseUser) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userID === reqresourseUser.toString()) return;

  throw new UnAuthenticatedError('You are not authorized to access this route');
};

export { checkpersmission };

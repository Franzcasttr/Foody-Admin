import ratelimit from 'express-rate-limit';

const limiter = ratelimit({
  windowMs: 1000 * 60 * 15, // 15 minutes
  max: 5, // request per user IP
  message: 'Too many attempts please try again later',
});

export default limiter;

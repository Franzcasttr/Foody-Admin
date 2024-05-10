import crypto from 'crypto';

const hashstring = (string) =>
  crypto.createHash('md5').update(string).digest('hex');

export default hashstring;

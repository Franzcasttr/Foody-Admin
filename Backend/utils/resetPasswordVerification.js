import { sendEmail } from './sendEmail.js';

export const Resetverification = async ({ name, email, token, origin }) => {
  const verifyEmail = `${origin}/user/forgot-password?token=${token}&email=${email}`;

  const message = `<h2>Password Reset</h2><br /><p>*Note: The link will expire in 10 minutes</p><br /><p>Reset your password by clicking the following link: <a href="${verifyEmail}">Reset password</a></p>`;

  sendEmail({
    to: email,
    subject: 'Password Reset',
    html: `<h4>Hello, ${name} </h4> 
    ${message}`,
  });
};

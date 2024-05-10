import { sendEmail } from './sendEmail.js';

export const verificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please verify your email by clicking the following link: <a href="${verifyEmail}">verify</a></p>`;

  sendEmail({
    to: email,
    subject: 'Verify Email',
    html: `<h4>Hello, ${name} </h4> 
    ${message}`,
  });
};

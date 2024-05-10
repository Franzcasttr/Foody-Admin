import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async ({ to, subject, html }) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: process.env.SECRET_USER,
        pass: process.env.SECRET_PASS,
      },
    });

    return transporter.sendMail({
      from: '"Foody Mail" <noreply@gmail.com>',
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

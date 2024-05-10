import express from 'express';
import {
  forgotPassword,
  logout,
  resetPassword,
  updateUser,
  uploadImage,
  userLogin,
  userRegister,
  verifyEmail,
} from '../controller/authController.js';
import authenicateUser from '../middleware/authentication.js';

const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/verify-email').post(verifyEmail);
router.route('/update-user').post(authenicateUser, updateUser);
router.route('/upload').post(uploadImage);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword').post(resetPassword);
router.route('/logout').delete(authenicateUser, logout);

export default router;

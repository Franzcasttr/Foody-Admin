import express from 'express';
import {
  adminLogin,
  adminLogout,
} from '../../controller/Admin/authController.js';
import { authenticateAdmin } from '../../middleware/authentication.js';
const router = express.Router();

router.route('/adminlogin').post(adminLogin);

router.route('/adminlogout').delete(authenticateAdmin, adminLogout);

export default router;

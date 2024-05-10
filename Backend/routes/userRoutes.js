import express from 'express';

import {
  changePassword,
  getAllUsers,
  getUsers,
  showCurrrentUser,
} from '../controller/userController.js';
import authenticateUser from '../middleware/authentication.js';
const router = express.Router();

router.route('/showMe').get(authenticateUser, showCurrrentUser);
router.route('/getAllPaginatedusers').get(getAllUsers);
router.route('/getAllusers').get(getUsers);

router.route('/changePassword').patch(authenticateUser, changePassword);

export default router;

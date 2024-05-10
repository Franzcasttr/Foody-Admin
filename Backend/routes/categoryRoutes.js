import express from 'express';
import { allowedRoles } from '../config/allowedRoles.js';
import {
  createCategory,
  fetchCategory,
} from '../controller/categoryController.js';
import {
  authenticateAdmin,
  authorizePermission,
} from '../middleware/authentication.js';

const router = express.Router();

router.post(
  '/createCategory',
  authenticateAdmin,
  authorizePermission(allowedRoles.Admin),
  createCategory
);
router.get('/fetchCategory', fetchCategory);

export default router;

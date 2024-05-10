import express from 'express';
import { allowedRoles } from '../../config/allowedRoles.js';
import {
  admingetAllUsers,
  admingetUsers,
  adminremoveUser,
  adminupdateUser,
  showCurrrentAdmin,
} from '../../controller/Admin/userController.js';

import authenticateUser, {
  authenticateAdmin,
  authorizePermission,
} from '../../middleware/authentication.js';
const router = express.Router();

router.route('/showMe').get(authenticateAdmin, showCurrrentAdmin);
router.route('/getAllPaginatedusers').get(admingetAllUsers);
router.route('/getAllusers').get(admingetUsers);
router
  .route('/removeUser/:id')
  .delete(
    authenticateAdmin,
    authorizePermission(allowedRoles.Admin),
    adminremoveUser
  );

router
  .route('/updateUser')
  .patch(
    authenticateAdmin,
    authorizePermission(allowedRoles.Admin),
    adminupdateUser
  );

export default router;

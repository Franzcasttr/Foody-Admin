import express from 'express';
import { allowedRoles } from '../config/allowedRoles.js';
import {
  createProduct,
  deleteProduct,
  getAllPaginateProducts,
  getAllproducts,
  getProductByCategory,
  getProductsBySearch,
  getSingleProduct,
  updateProduct,
} from '../controller/productController.js';
import {
  authenticateAdmin,
  authorizePermission,
} from '../middleware/authentication.js';

const router = express.Router();

router.route('/').get(getAllproducts);
router.route('/getPaginateProducts').get(getAllPaginateProducts);
router.route('/category').get(getProductByCategory);
router.route('/search').get(getProductsBySearch);
router
  .route('/updateProduct')
  .patch(
    authenticateAdmin,
    authorizePermission(allowedRoles.Admin),
    updateProduct
  );
router
  .route('/createProduct')
  .post(
    authenticateAdmin,
    authorizePermission(allowedRoles.Admin),
    createProduct
  );
router.route('/:id').get(getSingleProduct);

router.delete(
  '/delete/:id',
  authenticateAdmin,
  authorizePermission(allowedRoles.Admin),
  deleteProduct
);

export default router;

import express from 'express';
import {
  clearCart,
  createOrder,
  deleteCart,
  getUserCart,
} from '../controller/cartCotroller.js';
import authenicateUser from '../middleware/authentication.js';

const router = express.Router();

router.route('/addtocart').post(authenicateUser, createOrder);
router.route('/usercart').get(authenicateUser, getUserCart);

router.route('/delete').post(authenicateUser, deleteCart);
router.route('/clearCart').delete(authenicateUser, clearCart);

export default router;

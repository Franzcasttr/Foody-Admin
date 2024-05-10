import express from 'express';
import {
  CreateReview,
  deleteReview,
  getAllReviews,
  getSingleProductReview,
  getUserReviews,
  updataReview,
} from '../controller/reviewController.js';
import authenicateUser from '../middleware/authentication.js';
const router = express.Router();

router.post('/createReview', authenicateUser, CreateReview);
router.get('/getAllReviews', getAllReviews);
router.get('/getUserReviews', authenicateUser, getUserReviews);
router.patch('/:id', authenicateUser, updataReview);
router.delete('/:id', authenicateUser, deleteReview);
router.get('/:id/reviews', getSingleProductReview);

export default router;

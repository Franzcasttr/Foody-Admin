import express from 'express';
import {
  addToFavorite,
  getUserFavorite,
  removeFromFavorite,
} from '../controller/favoriteController.js';
import authenicateUser from '../middleware/authentication.js';
const router = express.Router();

router.post('/addToFavorite', authenicateUser, addToFavorite);
router.get('/getUserFavorite', authenicateUser, getUserFavorite);
router.delete('/:id', authenicateUser, removeFromFavorite);

export default router;

import express from 'express';
import {
  addAddress,
  deleteUserAddress,
  getUserAddress,
  updateAddress,
} from '../controller/addressController.js';
import authenicateUser from '../middleware/authentication.js';
const router = express.Router();

router.post('/create', authenicateUser, addAddress);
router.get('/useraddress', authenicateUser, getUserAddress);
router.delete('/removeUserAddress/:id', authenicateUser, deleteUserAddress);
router.patch('/updateAddress', authenicateUser, updateAddress);

export default router;

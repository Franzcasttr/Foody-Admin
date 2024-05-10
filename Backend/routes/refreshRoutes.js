import express from 'express';
import { refreshTokenHandler } from '../controller/refreshController.js';

const router = express.Router();

router.get('/', refreshTokenHandler);

export default router;

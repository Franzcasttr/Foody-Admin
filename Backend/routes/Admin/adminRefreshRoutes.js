import express from 'express';
import { adminRefreshTokenHandler } from '../../controller/Admin/refreshController.js';

const router = express.Router();

router.get('/', adminRefreshTokenHandler);

export default router;

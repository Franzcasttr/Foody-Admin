import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
dotenv.config();
const app = express();
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';
import xss from 'xss-clean';
import cookieparser from 'cookie-parser';
import fileupload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//middleware
import NotFound from './middleware/NotFound.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';

// Routes
import authRouter from './routes/authRoutes.js';
import adminAuthRouter from './routes/Admin/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import userRouter from './routes/userRoutes.js';
import addressRouter from './routes/addressRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import favoriteRoutes from './routes/addToFavoritesRoutes.js';
import refreshRoutes from './routes/refreshRoutes.js';
import adminRefreshRoutes from './routes/Admin/adminRefreshRoutes.js';
import adminUserRouter from './routes/Admin/userRoutes.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use((req, res, next) => {
  if (req.originalUrl === '/api/v1/order/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(fileupload({ useTempFiles: true }));
app.use(cookieparser(process.env.JWT_SECRET));
app.use(xss());
app.use(
  cors({
    origin: ['https://foody-17af1.web.app', 'https://foodyadmin-11c83.web.app'],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//     optionSuccessStatus: 200,
//   })
// );

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin/auth', adminAuthRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin/user', adminUserRouter);
app.use('/api/v1/address', addressRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/favorite', favoriteRoutes);
app.use('/api/v1/refresh', refreshRoutes);
app.use('/api/v1/admin/refresh', adminRefreshRoutes);

//testing
app.get('/api/v1', (req, res) => {
  res.send('cookie');
  console.log(req.signedCookies);
});

app.get('/', (req, res) => {
  res.send('welcome to foody admin');
});

app.use(NotFound);
app.use(errorHandlerMiddleware);

const Port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(Port, () => {
      console.log(`Server is listening to port ${Port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

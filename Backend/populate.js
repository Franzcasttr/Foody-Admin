import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import Product from './models/Product.js';
import connectDB from './db/db.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany();
    const jsonProduct = JSON.parse(
      await readFile(new URL('./product.json', import.meta.url))
    );
    await Product.create(jsonProduct);
    console.log('sucess');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();

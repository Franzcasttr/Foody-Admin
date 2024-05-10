import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.SECRET_KEY);

let endpointSecret = process.env.SIGN_IN_SECRET;

import {
  CreateOrder,
  deleteOrder,
  getAllOrders,
  getUserOrder,
  paymentIntent,
  webhook,
} from '../controller/OrderController.js';
import authenicateUser from '../middleware/authentication.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

router.route('/createOrder').post(authenicateUser, CreateOrder);
router.route('/getAllOrders').get(getAllOrders);
router.route('/getUserOrders').get(authenicateUser, getUserOrder);
router.route('/createPaymentIntent').post(authenicateUser, paymentIntent);
router.route('/:id').delete(authenicateUser, deleteOrder);

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    let data;
    let eventType;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object.metadata.orders;
    eventType = event.type;

    //handle payment type change event
    if (eventType === 'payment_intent.succeeded') {
      const paymentIntent = data;
      CreateOrderSuccess(paymentIntent);
    }

    res.send();
  }
);

const CreateOrderSuccess = async (paymentIntent) => {
  const orderItems = JSON.parse(paymentIntent);
  const { items } = orderItems;

  let product;
  let Qty;
  for (const item of items) {
    product = item.productId;
    Qty = item.purchasedQty;
  }

  await Cart.deleteOne({ user: orderItems.user });

  const cartPaymentOrder = new Order(orderItems);

  cartPaymentOrder.save(async (error, order) => {
    if (error) {
      console.log(error);
    }

    if (order) {
      const invent = await Product.findOne({ _id: product });
      Product.findOneAndUpdate(
        { _id: product },
        {
          inventory: (invent.inventory -= Qty),
        }
      ).exec((error, result) => {
        if (error) {
          console.log(error);
        }
        if (result) {
        }
      });
    }
  });

  if (!orderItems) {
    throw new BadRequest('Something went wrong please try again');
  }
};
export default router;

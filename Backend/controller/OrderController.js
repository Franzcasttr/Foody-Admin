import { StatusCodes } from 'http-status-codes';
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.SECRET_KEY);

let endpointSecret = process.env.SIGN_IN_SECRET;

import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import BadRequest from '../errors/badRequest.js';
import { NotFoudError } from '../errors/index.js';
import Product from '../models/Product.js';

const CreateOrder = async (req, res) => {
  const { items } = req.body;
  req.body.user = req.user.userID;

  let product;
  let Qty;
  for (const item of items) {
    product = item.productId;
    Qty = item.purchasedQty;
  }

  Cart.deleteOne({ user: req.user.userID }).exec(async (error, result) => {
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ error });
    if (result) {
      const order = new Order(req.body);
      order.save(async (error, order) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        }

        if (order) {
          const invent = await Product.findOne({ _id: product });
          Product.findOneAndUpdate(
            { _id: product },
            {
              inventory: (invent.inventory -= Qty),
            }
          ).exec(async (error, result) => {
            if (error)
              return res.status(StatusCodes.BAD_REQUEST).json({ error });
            if (result) {
              res.status(StatusCodes.CREATED).json({ result });
            }
          });
        }
      });
    }
  });
};

const paymentIntent = async (req, res) => {
  req.body.user = req.user.userID;
  req.body.paymentStatus = 'completed';

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.totalAmount,
    currency: 'usd',
    metadata: {
      orders: JSON.stringify(req.body),
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.status(201).json({ clientSecret: paymentIntent.client_secret });
};

//Order hook
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

const webhook = async (req, res) => {
  express.raw({ type: 'application/json' });

  let data;
  let eventType;
  const sig = req.headers['stripe-signature'];

  let event;

  if (endpointSecret) {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = req.body.data.object.metadata.orders;
    eventType = req.body.type;
  } else {
    eventType = req.body.type;
    data = req.body.data.object.metadata.orders;
  }

  //handle payment type change event
  if (eventType === 'payment_intent.succeeded') {
    const paymentIntent = data;
    CreateOrderSuccess(paymentIntent);
  }
  res.status(200).json({ success: true });
};

const getAllOrders = async (req, res) => {
  const { searchQuery } = req.query;

  const queryObject = {};

  if (searchQuery) {
    queryObject.user.name = { $regex: searchQuery, $options: 'i' };
  }

  let result = Order.find(queryObject).populate(
    'user addressId items.productId',
    'name profileimage street province city barangay postalcode'
  );
  if (!result) {
    throw new NotFoudError('No Order has been found');
  }

  const monthly = await Order.aggregate([
    {
      $group: {
        _id: {
          month: {
            $month: '$createdAt',
          },
        },
        totalAmount: {
          $sum: {
            $toInt: '$totalAmount',
          },
        },
      },
    },
    {
      $project: {
        totalAmount: '$totalAmount',
        Month: {
          $arrayElemAt: [
            [
              '',
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            '$_id.month',
          ],
        },
      },
    },
  ]);

  const page = req.query.page || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const order = await result;

  if (searchQuery) {
    const totalOrder = order.length;
    const numberOfPages = Math.ceil(totalOrder / limit);
    res.status(StatusCodes.OK).json({ orders: order, numberOfPages, monthly });
  } else {
    const totalOrder = await Order.countDocuments();
    const numberOfPages = Math.ceil(totalOrder / limit);

    res.status(StatusCodes.OK).json({ orders: order, numberOfPages, monthly });
  }
};

const getUserOrder = async (req, res) => {
  const result = await Order.find({ user: req.user.userID })
    .populate('items.productId', '_id name price image tag')
    .sort({ createdAt: -1 });

  if (!result) {
    throw new NotFoudError(
      'Empty Orders for user with ID of ' + req.user.userID
    );
  }

  res.status(StatusCodes.OK).json({ orders: result, count: result.length });
};

const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOneAndDelete({ _id: orderId });
  if (!order) {
    throw new NotFoudError('No order with id ' + orderId);
  }
  res.status(StatusCodes.OK).json({ msg: 'Order deleted successfully' });
};

export {
  CreateOrder,
  paymentIntent,
  webhook,
  getAllOrders,
  getUserOrder,
  deleteOrder,
};

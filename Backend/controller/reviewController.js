import { StatusCodes } from 'http-status-codes';
import { BadRequest } from '../errors/index.js';
import NotFoundError from '../errors/notFound.js';
import Order from '../models/Order.js';

import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { checkpersmission } from '../utils/checkPermission.js';

const CreateReview = async (req, res) => {
  const { product: ProductID, itemsId } = req.body;
  // console.log(req.body);
  const isProductValid = await Product.findOne({ _id: ProductID });
  if (!isProductValid) {
    throw new NotFoundError(`No Product with ID ${ProductID}`);
  }

  req.body.user = req.user.userID;
  const review = new Review(req.body);
  await review.save((error, reviews) => {
    if (error) return res.status(400).json({ error });
    if (reviews) {
      Order.findOneAndUpdate(
        {
          user: req.user.userID,
          'items._id': itemsId,
        },
        {
          $set: {
            'items.$.toRate': 'rated',
          },
        }
      ).exec((error, results) => {
        if (error) return res.status(400).json({ error });
        if (results) {
          res.status(StatusCodes.CREATED).json({ review: results });
        }
      });
    }
  });
};

const getAllReviews = async (req, res) => {
  const review = await Review.find({});
  res.status(StatusCodes.OK).json({ review, count: review.length });
};

const getUserReviews = async (req, res) => {
  const review = await Review.find({ user: req.user.userID })
    .populate('product user', 'name image profileimage')
    .sort({ date: 1 });

  if (!review) {
    throw new NotFoundError('Please login to continue');
  }

  res.status(StatusCodes.OK).json({ userReview: review, count: review.length });
};

const updataReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const { rating, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }

  checkpersmission(req.user, review.user);
  review.rating = rating;
  review.comment = comment;
  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new NotFoundError(`No review with id ${reviewID}`);
  }
  checkpersmission(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: 'Review has been removed' });
};

const getSingleProductReview = async (req, res) => {
  const { id: productId } = req.params;

  const review = await Review.find({ product: productId }).populate(
    'user',
    'name profileimage '
  );

  if (!review) {
    throw new NotFoundError(`No review with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ review, count: review.length });
};

export {
  CreateReview,
  getAllReviews,
  getUserReviews,
  updataReview,
  deleteReview,
  getSingleProductReview,
};

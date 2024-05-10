import { StatusCodes } from 'http-status-codes';
import { NotFoudError, BadRequest } from '../../errors/index.js';
import NotFoundError from '../../errors/notFound.js';
import Order from '../../models/Order.js';
import User from '../../models/User.js';
import { uploadImage } from '../../utils/uploadImage.js';

export const showCurrrentAdmin = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userID }).select(
    'name email profileimage role'
  );
  res.status(StatusCodes.OK).json({ user });
};

export const admingetUsers = async (req, res) => {
  const result = await User.find({});
  if (!result) {
    throw new NotFoudError('No User found');
  }

  res.status(StatusCodes.OK).json({ result });
};

export const admingetAllUsers = async (req, res) => {
  const { searchQuery } = req.query;

  const queryObject = {};

  if (searchQuery) {
    queryObject.name = { $regex: searchQuery, $options: 'i' };
  }

  let result = User.find(queryObject);

  if (!result) {
    throw new NotFoudError('No user has been found');
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const user = await result;

  if (searchQuery) {
    const totalUser = user.length;
    const numberOfPages = Math.ceil(totalUser / limit);
    res.status(StatusCodes.OK).json({ user, numberOfPages });
  } else {
    const totalUser = await User.countDocuments();
    const numberOfPages = Math.ceil(totalUser / limit);
    res.status(StatusCodes.OK).json({ user, numberOfPages });
  }
};

export const adminupdateUser = async (req, res) => {
  const { id, name, email, role } = req.body;

  let userImage;
  if (!req.files) {
    User.findOneAndUpdate(
      { _id: id },
      { name, email, role },
      { new: true }
    ).exec((error, result) => {
      if (error) {
        console.log(error);
        throw new BadRequest('Something went wrong please try again');
      }
      if (result) {
        res.status(StatusCodes.OK).json({ msg: 'User updated successfully' });
      }
    });
  } else {
    userImage = req.files.profileimage;
    const maxSize = 1024 * 1024;
    if (userImage.size > maxSize) {
      throw new BadRequest('Please upload image lower than 1mb');
    }
    if (!userImage.mimetype.startsWith('image')) {
      throw new BadRequest('Please upload an image');
    }

    const images = await uploadImage(userImage);
    User.findOneAndUpdate(
      { _id: id },
      { name, email, role, profileimage: images }
    ).exec((error, result) => {
      if (error) {
        throw new BadRequest('Something went wrong please try againiy');
      }
      if (result) {
        res.status(StatusCodes.OK).json({ msg: 'User updated successfully' });
      }
    });
  }
};

export const adminremoveUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new NotFoundError('No user with id' + id);
  }

  User.findOneAndDelete({ _id: id }).exec(async (error, result) => {
    if (error) return res.sendStatus(403);
    if (result) {
      await Order.findOneAndDelete({ user: id });
      res
        .status(StatusCodes.ACCEPTED)
        .json({ msg: 'User removed successfully' });
    }
  });
};

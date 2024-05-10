import { StatusCodes } from 'http-status-codes';
import BadRequest from '../errors/badRequest.js';
import { NotFoudError } from '../errors/index.js';
import NotFoundError from '../errors/notFound.js';
import Product from '../models/Product.js';
import { productUploadImage } from '../utils/uploadImage.js';

const createProduct = async (req, res) => {
  // req.body.user = req.user.userID;

  const {
    name,
    tag,
    price,
    desc,
    inventory,
    brand,
    category,
    exclusive,
    bestoffer,
    freeshipping,
  } = req.body;
  if (!req.files) {
    throw new BadRequest('Please provide image');
  }

  const productImage = req.files.image;
  const maxSize = 1024 * 1024;

  if (productImage > maxSize) {
    throw new BadRequest('Please upload images lower than 1mb');
  }

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequest('Please upload an image');
  }

  const image = await productUploadImage(productImage);

  const product = await Product.create({
    name,
    tag,
    price,
    desc,
    inventory,
    brand,
    category,
    exclusive,
    bestoffer,
    freeshipping,
    image,
  });
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllproducts = async (req, res) => {
  const product = await Product.find({});

  res.status(StatusCodes.OK).json({ product });
};
const getAllPaginateProducts = async (req, res) => {
  const { searchQuery } = req.query;

  const queryObject = {};

  if (searchQuery) {
    queryObject.name = { $regex: searchQuery, $options: 'i' };
  }

  let result = Product.find(queryObject);

  if (!result) {
    throw new NotFoudError('No Product has been found');
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const product = await result;
  if (searchQuery) {
    const totalProduct = product.length;
    const numberOfPages = Math.ceil(totalProduct / limit);
    res.status(StatusCodes.OK).json({ product, totalProduct, numberOfPages });
  } else {
    const totalProduct = await Product.countDocuments();
    const numberOfPages = Math.ceil(totalProduct / limit);
    res.status(StatusCodes.OK).json({ product, totalProduct, numberOfPages });
  }
};
const getProductsBySearch = async (req, res) => {
  const { searchQuery, sort, catalog } = req.query;

  const queryObject = {};

  if (searchQuery) {
    queryObject.name = { $regex: searchQuery, $options: 'i' };
  }

  if (catalog) {
    queryObject.category = catalog;
  }

  let result = Product.find(queryObject);

  if (sort === 'price-lowest') {
    result = result.sort('-price');
  }
  if (sort === 'price-highest') {
    result = result.sort('price');
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const product = await result;

  const totalProduct = await Product.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProduct / limit);

  if (product.length < 1) {
    throw new NotFoundError('The item you search is not found');
  }
  res.status(StatusCodes.OK).json({ product, totalProduct, numOfPages });
};

const getProductByCategory = async (req, res) => {
  const { category, sort } = req.query;

  let result = Product.find({ category });

  if (sort === 'price-lowest') {
    result = result.sort('-price');
  }
  if (sort === 'price-highest') {
    result = result.sort('price');
  }

  const product = await result;

  res.status(StatusCodes.OK).json({ product, count: product.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.find({ _id: productID });
  if (!product) {
    throw new NotFoundError(
      `Product with id of ${productID} is no longer found`
    );
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const {
    id,
    name,
    tag,
    price,
    desc,
    inventory,
    brand,
    category,
    exclusive,
    bestoffer,
    freeshipping,
  } = req.body;

  let userImage;
  if (!req.files) {
    Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        tag,
        price,
        desc,
        inventory,
        brand,
        category,
        exclusive,
        bestoffer,
        freeshipping,
      },
      { new: true }
    ).exec((error, result) => {
      if (error) {
        console.log(error);
        throw new BadRequest('Something went wrong please try again');
      }
      if (result) {
        res
          .status(StatusCodes.OK)
          .json({ msg: 'Product updated successfully' });
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

    const images = await productUploadImage(userImage);
    Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        image: images,
        tag,
        price,
        desc,
        inventory,
        brand,
        category,
        exclusive,
        bestoffer,
        freeshipping,
      }
    ).exec((error, result) => {
      if (error) {
        throw new BadRequest('Something went wrong please try againiy');
      }
      if (result) {
        res
          .status(StatusCodes.OK)
          .json({ product: 'Product updated successfully' });
      }
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    throw new NotFoundError(
      `Product with ID of ${productID} is no longer found`
    );
  }
  res.status(StatusCodes.OK).json({ message: 'Product successfully removed' });
};

export {
  getAllproducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsBySearch,
  getProductByCategory,
  getAllPaginateProducts,
};

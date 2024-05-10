import { StatusCodes } from 'http-status-codes';
import BadRequest from '../errors/badRequest.js';
import Categories from '../models/Categories.js';
import { categoryUploadImage } from '../utils/uploadImage.js';

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!req.files) {
    throw new BadRequest('Please provide an image');
  }
  const Image = req.files.categoryImage;

  if (!Image.mimetype.startsWith('image')) {
    throw new BadRequest('Please upload an image');
  }

  const maxSize = 1024 * 1024;

  if (productImage > maxSize) {
    throw new BadRequest('Please upload images lower than 1mb');
  }

  const categoryImage = await categoryUploadImage(Image);

  const results = await Categories.create({ name, categoryImage });
  res.status(StatusCodes.CREATED).json({ result: results });
};

const fetchCategory = async (req, res) => {
  const results = await Categories.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'name',
        foreignField: 'category',
        as: 'items',
      },
    },
    { $project: { 'items.category': 1, name: 1, categoryImage: 1 } },
  ]);

  res.status(StatusCodes.OK).json({ result: results });
};

export { createCategory, fetchCategory };

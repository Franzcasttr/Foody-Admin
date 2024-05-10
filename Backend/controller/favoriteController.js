import { BadRequest } from '../errors/index.js';
import Favorites from '../models/Favorites.js';

const addToFavorite = async (req, res) => {
  req.body.user = req.user.userID;

  const result = await Favorites.create(req.body);
  res.status(201).json({ favorite: result });
};

const getUserFavorite = async (req, res) => {
  const result = await Favorites.find({ user: req.user.userID }).populate(
    'product',
    '_id name image price tag'
  );
  res.status(200).json({ favorite: result, count: result.length });
};

const removeFromFavorite = async (req, res) => {
  const { id } = req.params;
  await Favorites.findOneAndRemove({ user: req.user.userID, product: id });
  res.status(200).json({ message: 'Successfully removed' });
};

export { addToFavorite, getUserFavorite, removeFromFavorite };

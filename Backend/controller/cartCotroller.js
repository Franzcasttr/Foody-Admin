import { StatusCodes } from 'http-status-codes';
import { NotFoudError, BadRequest } from '../errors/index.js';
import Cart from '../models/Cart.js';

const createOrder = async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems) {
    throw new NotFoudError('Error please try again');
  }

  Cart.findOne({ user: req.user.userID }).exec((error, cart) => {
    if (error) {
      throw new BadRequest('Something went wrong please try again');
    }
    if (cart) {
      const product = cartItems.product;
      const isItemAdded = cart.cartItems.find((c) => c.product == product);

      if (isItemAdded) {
        Cart.findOneAndUpdate(
          { user: req.user.userID, 'cartItems.product': product },
          {
            $set: {
              'cartItems.$': cartItems,
            },
          }
        ).exec((error, cart) => {
          if (error) {
            throw new BadRequest('Something went wrong please try again');
          }
          if (cart) {
            res.status(StatusCodes.CREATED).json({ cart: cart });
          }
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user.userID },
          {
            $push: {
              cartItems: cartItems,
            },
          },
          { new: true }
        ).exec((error, cart) => {
          if (error) {
            throw new BadRequest('Something went wrong please try again');
          }
          if (cart) {
            res.status(StatusCodes.CREATED).json({ cart: cart });
          }
        });
      }
    } else {
      const cart = new Cart({ user: req.user.userID, cartItems: cartItems });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          res.status(StatusCodes.CREATED).json({ cart });
        }
      });
    }
  });
};

const getUserCart = async (req, res) => {
  Cart.findOne({ user: req.user.userID })
    .populate('cartItems.product', '_id name price image')
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        for (const item of cart.cartItems) {
          cartItems[item.product._id] = {
            id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            amount: item.quantity,
          };
        }

        res.status(StatusCodes.OK).json({ cartItems });
      } else if (cart === null) {
        let cartItems = {};
        res.status(StatusCodes.OK).json({ cartItems });
      }
    });
};

const deleteCart = async (req, res) => {
  const { productId } = req.body;

  if (productId) {
    Cart.updateOne(
      { user: req.user.userID },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(StatusCodes.ACCEPTED).json({ result });
      }
    });
  }
};

const clearCart = async (req, res) => {
  const result = await Cart.findOneAndDelete({ user: req.user.userID });
  if (!result) {
    throw new NotFoudError('No such product please try again');
  }

  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: 'Successfully cleared all cart items' });
};

export { createOrder, getUserCart, deleteCart, clearCart };

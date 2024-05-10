import mongoose from 'mongoose';

const singleOrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  payablePrice: {
    type: Number,
    required: true,
  },
  purchasedQty: {
    type: Number,
    required: true,
  },
  toRate: {
    type: String,
    enum: ['rate', 'rated'],
    default: 'rate',
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserAddress',
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [singleOrderSchema],
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'cancelled', 'refund'],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['cod', 'card'],
      default: 'cod',
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['preparing', 'packed', 'shipped', 'delivered'],
      default: 'preparing',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dyvisacbu/image/upload/v1647763029/food-denx/logo/image-gallery_yjlhgf.png',
    },
    tag: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
      default: 0,
    },
    desc: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: [1000, 'Description cannot be more thann 1000 characters'],
    },
    inventory: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide company'],
    },

    exclusive: {
      type: Boolean,
      default: false,
    },
    bestoffer: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },

    shipingFee: { type: Number },

    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ProductSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ product: this._id });
});
export default mongoose.model('Product', ProductSchema);

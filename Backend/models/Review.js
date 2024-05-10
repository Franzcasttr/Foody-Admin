import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    comment: {
      type: String,
      // required: [true, 'Please provide review text'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    date: {
      type: String,
      default: new Date().toDateString(),
    },
  },
  { timestamps: true }
);
// ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
ReviewSchema.statics.caculateaverageRarting = async function (productID) {
  const result = await this.aggregate([
    { $match: { product: productID } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
  console.log(result[0]);
  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productID },
      {
        averageRating: Math.round(result[0]?.averageRating * 10 || 0) / 10,
        numOfReviews: result[0]?.numOfReviews || 0,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post('save', async function () {
  await this.constructor.caculateaverageRarting(this.product);
});
ReviewSchema.post('remove', async function () {
  await this.constructor.caculateaverageRarting(this.product);
});
export default mongoose.model('Review', ReviewSchema);

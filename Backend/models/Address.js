import mongoose from 'mongoose';

const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      min: 3,
      max: 100,
    },
    mobilenumber: {
      type: Number,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    barangay: {
      type: String,
      required: true,
    },
    postalcode: {
      type: Number,
      required: true,
    },
    addresstype: {
      type: String,
      required: true,
      enum: ['work', 'home'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('UserAddress', userAddressSchema);

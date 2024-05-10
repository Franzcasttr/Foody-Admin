import { StatusCodes } from 'http-status-codes';
import { BadRequest } from '../errors/index.js';
import NotFoundError from '../errors/notFound.js';
import Address from '../models/Address.js';

const addAddress = async (req, res) => {
  const { payload } = req.body;
  if (
    !payload.address.name ||
    !payload.address.street ||
    !payload.address.mobilenumber ||
    !payload.address.province ||
    !payload.address.city ||
    !payload.address.postalcode ||
    !payload.address.barangay ||
    !payload.address.addresstype
  ) {
    throw new BadRequest('Please provide all values');
  }

  const user = req.user.userID;
  const {
    name,
    street,
    mobilenumber,
    province,
    city,
    postalcode,
    barangay,
    addresstype,
  } = payload.address;

  const result = await Address.create({
    user,
    name,
    street,
    mobilenumber,
    province,
    city,
    postalcode,
    barangay,
    addresstype,
  });
  res.status(201).json({ result });
};

const getUserAddress = async (req, res) => {
  const userAddress = await Address.find({ user: req.user.userID });

  if (!userAddress) {
    throw new NotFoundError('You have no saved address');
  }

  res.status(StatusCodes.OK).json({ userAddress });
};

const updateAddress = async (req, res) => {
  const { payload } = req.body;

  const address = await Address.findOneAndUpdate(
    { user: req.user.userID, _id: payload.address._id },
    {
      $set: payload.address,
    },
    { new: true }
  );

  res.status(200).json({ address });
};

const deleteUserAddress = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const userAddressId = await Address.findOneAndDelete({
    user: req.user.userID,
    _id: id,
  });

  if (!userAddressId) {
    throw new NotFoundError('No address with id ' + id);
  }
  res.status(StatusCodes.OK).json({ msg: 'Address successfully deleted' });
};

export { addAddress, getUserAddress, deleteUserAddress, updateAddress };

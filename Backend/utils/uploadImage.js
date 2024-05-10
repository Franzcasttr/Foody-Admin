import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const uploadImage = (userImage) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      userImage.tempFilePath,
      { use_filename: true, folder: 'User Image' },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result) {
          fs.unlinkSync(userImage.tempFilePath);
          resolve(result.secure_url);
        }
      }
    );
  });
};

export const productUploadImage = (userImage) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      userImage.tempFilePath,
      { use_filename: true, folder: 'Product Images' },
      (error, result) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        if (result) {
          fs.unlinkSync(userImage.tempFilePath);
          resolve(result.secure_url);
        }
      }
    );
  });
};

export const categoryUploadImage = (Image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      Image.tempFilePath,
      { use_filename: true, folder: 'Category image' },
      (error, result) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        if (result) {
          fs.unlinkSync(Image.tempFilePath);
          resolve(result.secure_url);
        }
      }
    );
  });
};

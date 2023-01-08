import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useCreateCategoryMutation } from '../../features/category/categoryApiSlice';
import ProductForm from '../Form/ProductForm';

const CategoryForm = ({ setAddnew }) => {
  const [images, setImages] = useState();
  const [name, setName] = useState('');
  const [createCategory] = useCreateCategoryMutation();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handlePicture = (e) => {
    setImages(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', name);
    form.append('categoryImage', images);

    try {
      await createCategory(form).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-6 bg-white'>
      <div className='flex justify-end text-2xl text-red-400'>
        <IoMdClose
          className='cursor-pointer'
          onClick={() => setAddnew(false)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <ProductForm
          labelText='Category Name'
          type='text'
          name='name'
          placeholder='Enter category'
          value={name}
          handleChange={handleChange}
        />
        <ProductForm
          labelText='Choose Image'
          type='file'
          name='categoryImage'
          handleChange={handlePicture}
        />

        <div className='flex justify-center md:justify-end'>
          <button
            type='submit'
            className='p-2 text-white bg-clr rounded-lg cursor-pointer'>
            Add New Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;

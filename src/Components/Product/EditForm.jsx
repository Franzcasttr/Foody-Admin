import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useUpdateProductMutation } from '../../features/product/productApiSlice';

import ProductForm from '../Form/ProductForm';

const EditForm = ({ setOpenEditForm, editProduct, categoryContent }) => {
  const [updatedProduct] = useUpdateProductMutation();
  const [values, setValues] = useState(editProduct);
  const [images, setImages] = useState();

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    setImages(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      _id,
      name,
      tag,
      price,
      desc,
      inventory,
      brand,
      category,
      exclusive,
      bestoffer,
      freeshipping,
    } = values;

    const EditForm = new FormData();
    EditForm.append('id', _id);
    EditForm.append('name', name);
    EditForm.append('image', images);
    EditForm.append('tag', tag);
    EditForm.append('price', price);
    EditForm.append('desc', desc);
    EditForm.append('inventory', inventory);
    EditForm.append('brand', brand);
    EditForm.append('category', category);
    EditForm.append('exclusive', exclusive);
    EditForm.append('bestoffer', bestoffer);
    EditForm.append('freeshipping', freeshipping);

    try {
      await updatedProduct(EditForm).unwrap();
      setOpenEditForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-6 bg-white'>
      <div className='flex justify-end text-2xl text-red-400'>
        <IoMdClose
          className='cursor-pointer'
          onClick={() => setOpenEditForm(false)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <ProductForm
          labelText='Product Name'
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
        />
        <ProductForm
          type='text'
          name='tag'
          value={values.tag}
          handleChange={handleChange}
        />
        <ProductForm
          type='number'
          name='price'
          value={values.price}
          handleChange={handleChange}
        />
        <ProductForm
          textArea='textarea'
          labelText='Description'
          name='desc'
          value={values.desc}
          handleChange={handleChange}
        />
        <ProductForm
          type='number'
          name='inventory'
          placeholder='Enter inventory quantity'
          value={values.inventory}
          handleChange={handleChange}
        />
        <div className='flex flex-col gap-4'>
          <div className='flex gap-2'>
            <label
              htmlFor='category'
              className='capitalize mb-1 primary2 font-semibold'>
              Category
            </label>
            <p className='primary text-2xl'>*</p>
          </div>

          {/* {data.result} */}
          <select
            name='category'
            onChange={handleChange}
            className='primary2 bg-none outline-none h-5 border-b-[2px] border-gray-400 border-opacity-20 mb-6'
            required>
            <option>
              {values.category ? values.category : 'Select Category'}
            </option>
            {categoryContent.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <ProductForm
          type='text'
          name='brand'
          placeholder='Enter brand name'
          value={values.brand}
          handleChange={handleChange}
        />
        <ProductForm
          labelText='Choose Image'
          type='file'
          name='image'
          handleChange={handleImage}
        />
        <ProductForm labelText='exclusive' type='checkbox' name='exclusive' />
        <ProductForm labelText='best offer' type='checkbox' name='bestoffer' />
        <ProductForm
          labelText='Free Shipping'
          type='checkbox'
          name='freeshipping'
        />
        <div className='flex justify-center md:justify-end'>
          <button
            onClick={handleSubmit}
            type='submit'
            className='p-2 text-white bg-clr rounded-lg cursor-pointer'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;

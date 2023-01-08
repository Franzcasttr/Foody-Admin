import React, { useState } from 'react';
import ProductForm from '../Form/ProductForm';
import { IoMdClose } from 'react-icons/io';
import { useAddProductMutation } from '../../features/product/productApiSlice';
import { useDispatch } from 'react-redux';

const initialValues = {
  name: '',
  tag: '',
  price: '',
  desc: '',
  inventory: '',
  brand: '',
  category: '',
  exclusive: false,
  bestoffer: false,
  freeshipping: false,
};

const AddForm = ({ setAddnew, categoryContent }) => {
  const [addProduct] = useAddProductMutation();
  const [values, setValues] = useState(initialValues);
  const [images, setImages] = useState();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePicture = (e) => {
    setImages(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
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

    const form = new FormData();
    form.append('name', name);
    form.append('image', images);
    form.append('tag', tag);
    form.append('price', price);
    form.append('desc', desc);
    form.append('inventory', inventory);
    form.append('brand', brand);
    form.append('category', category);
    form.append('exclusive', exclusive);
    form.append('bestoffer', bestoffer);
    form.append('freeshipping', freeshipping);

    try {
      await addProduct(form).unwrap();
      setAddnew(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' p-6 overflow-y-auto'>
      <div className='flex justify-end text-3xl text-red-400 font-bold cursor-pointer'>
        <IoMdClose onClick={() => setAddnew(false)} />
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
          labelText='Quantity'
          type='number'
          name='inventory'
          placeholder='Enter quantity'
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
          handleChange={handlePicture}
        />
        <ProductForm
          labelText='exclusive'
          type='checkbox'
          name='exclusive'

          // handleChange={handleChange}
        />
        <ProductForm
          labelText='best offer'
          type='checkbox'
          name='bestoffer'
          // handleChange={handleChange}
        />
        <ProductForm
          labelText='Free Shipping'
          type='checkbox'
          name='freeshipping'
          // handleChange={handleChange}
        />
        <div className='flex justify-center md:justify-end'>
          <button
            type='submit'
            className='p-2 text-white bg-clr rounded-lg cursor-pointer'
            onClick={handleSubmit}>
            Add New Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;

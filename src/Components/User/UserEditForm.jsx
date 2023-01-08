import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import ProductForm from '../Form/ProductForm';

const UserEditForm = ({ setOpenEditForm, editUser, updateUser }) => {
  const [values, setValues] = useState(editUser);
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
    const { _id, name, email, role } = values;

    const form = new FormData();
    form.append('name', name);
    form.append('id', _id);
    form.append('profileimage', images);
    form.append('email', email);
    form.append('role', role);

    try {
      await updateUser(form).unwrap();
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
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
        />
        <ProductForm
          type='text'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        <ProductForm
          type='text'
          name='role'
          value={values.role}
          handleChange={handleChange}
        />

        <ProductForm
          labelText='Change Profile'
          type='file'
          name='profileimage'
          handleChange={handleImage}
        />

        <div className='flex justify-center md:justify-end'>
          <button
            onClick={() => setOpenEditForm(false)}
            type='submit'
            className='p-2 text-white bg-clr rounded-lg cursor-pointer'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;

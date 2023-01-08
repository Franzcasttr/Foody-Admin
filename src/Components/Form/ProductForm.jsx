import { data } from 'autoprefixer';
import React from 'react';

const ProductForm = ({
  name,
  type,
  value,
  handleChange,
  labelText,
  placeholder,
  textArea,
  select,
}) => {
  if (textArea) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <label
            htmlFor={name}
            className='capitalize mb-1 primary2 font-semibold'>
            {labelText || name}
          </label>
          <p className='primary text-2xl'>*</p>
        </div>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className='bg-none outline-none h-16 border-b-[2px] border-gray-400 border-opacity-20 mb-6'
        />
      </div>
    );
  }

  // if (select) {
  //   return (
  //     <div className='flex flex-col gap-4'>
  //       <div className='flex gap-2'>
  //         <label
  //           htmlFor={name}
  //           className='capitalize mb-1 primary2 font-semibold'>
  //           {labelText || name}
  //         </label>
  //         <p className='primary text-2xl'>*</p>
  //       </div>

  //       {/* {data.result} */}
  //       <select
  //         name='category'
  //         id='category'
  //         onChange={handleChange}
  //         className='primary2 bg-none outline-none h-5 border-b-[2px] border-gray-400 border-opacity-20 mb-6'
  //         required>
  //         <option>Select category</option>
  //         <option value='meatandfish'>Meat And Fish</option>
  //         <option value='dary'>Daries</option>
  //         <option value='vagetable'>Vegetable</option>
  //         <option value='fruit'>Fruits</option>
  //         <option value='bread'>Breads</option>
  //         <option value='beverage'>Beverages</option>
  //       </select>
  //     </div>
  //   );
  // }

  if (type === 'checkbox') {
    return (
      <div className='flex gap-4 border-b-[2px] border-gray-400 border-opacity-20 mb-6'>
        <label
          htmlFor={name}
          className='capitalize mb-1 primary2 font-semibold'>
          {labelText || name}
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
  if (type === 'file') {
    return (
      <div className='flex flex-col gap-4 border-b-[2px] border-gray-400 border-opacity-20 mb-6'>
        <div className='flex gap-2'>
          <label
            htmlFor={name}
            className='capitalize mb-1 primary2 font-semibold'>
            {labelText || name}
          </label>
          <p className='primary text-2xl'>*</p>
        </div>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        <label
          htmlFor={name}
          className='capitalize mb-1 primary2 font-semibold'>
          {labelText || name}
        </label>
        <p className='primary text-2xl'>*</p>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className='bg-none outline-none h-5 border-b-[2px] border-gray-400 border-opacity-20 mb-6 '
        required
      />
    </div>
  );
};

export default ProductForm;

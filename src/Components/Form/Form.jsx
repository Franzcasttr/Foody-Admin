import React from 'react';

const Form = ({ name, type, value, handleChange, labelText, placeholder }) => {
  return (
    <div className='flex flex-col gap-4'>
      <label htmlFor={name} className='capitalize mb-1 primary2 font-semibold'>
        {labelText || name}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className='bg-none outline-none h-5 border-b-[2px] border-gray-400 border-opacity-20 mb-6 '
      />
    </div>
  );
};

export default Form;

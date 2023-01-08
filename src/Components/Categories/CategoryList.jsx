import React from 'react';

const CategoryList = ({ categoryData }) => {
  return (
    <div className='grid grid-cols-[1fr_1fr] gap-2 mb-8 md:md:gap-8 '>
      {categoryData &&
        categoryData.map((data, index) => {
          const { name, categoryImage, items } = data;

          return (
            <article
              key={index}
              className='bg-white p-4 flex flex-col gap-2 text-center items-center rounded-lg primary2 font-semibold categ'>
              <img
                src={categoryImage}
                alt={name}
                className='w-[44px] h-[43px] md:w-[80px] md:h-[80px] object-cover md:object-contain'
              />
              <p>{name}</p>
              <p className='flex flex-col'>
                <span>{items.length}</span>
                {items.length > 1 ? 'Items' : 'Item'}
              </p>
            </article>
          );
        })}
    </div>
  );
};

export default CategoryList;

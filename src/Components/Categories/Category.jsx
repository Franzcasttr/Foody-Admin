import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useGetCategoryQuery } from '../../features/category/categoryApiSlice';

import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

const Category = () => {
  const [addnew, setAddnew] = useState(false);
  const { data: category, isSuccess: success } = useGetCategoryQuery();

  let categoryData;
  if (success) {
    categoryData = category.result;
  }

  return (
    <div className=''>
      <div className='flex justify-end mb-8'>
        <button
          className='p-2 text-white bg-clr rounded-lg cursor-pointer'
          onClick={() => setAddnew(!addnew)}>
          Add Category
        </button>
      </div>
      <AnimatePresence>
        {addnew && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='modal-backdrop'
              onClick={() => setAddnew(false)}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='category-content'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <CategoryForm setAddnew={setAddnew} />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <CategoryList categoryData={categoryData} />
    </div>
  );
};

export default Category;

import React, { useEffect } from 'react';
import Category from '../Components/Categories/Category';

const CategoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className='section-center'>
      <Category />
    </section>
  );
};

export default CategoryPage;

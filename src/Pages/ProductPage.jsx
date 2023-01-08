import React, { useEffect } from 'react';
import ProductList from '../Components/Product/ProductList';

const ProductPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='section-center'>
      <ProductList />
    </div>
  );
};

export default ProductPage;

import React, { useEffect } from 'react';
import Order from '../Components/Order/Order';

const OrderPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className='section-center'>
      <Order />
    </section>
  );
};

export default OrderPage;

import React, { useState } from 'react';
import { useGetOrderQuery } from '../../features/order/orderSlice';
import Loading from '../../Utils/Loading';

import OrderBtn from '../Paginations/OrderBtn';
import OrderTable from './OrderTable';

const Order = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isSuccess } = useGetOrderQuery(page);

  if (isLoading) {
    return <Loading />;
  }
  let orderData;
  let numberOfPages;
  if (isSuccess) {
    orderData = data.orders;
    numberOfPages = data.numberOfPages;
  }

  return (
    <div>
      <p className='py-8 primary2 font-bold text-2xl'>Orders</p>

      <div>
        <OrderTable orderData={orderData} />
        {numberOfPages > 1 && (
          <OrderBtn
            numberOfPages={numberOfPages}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Order;

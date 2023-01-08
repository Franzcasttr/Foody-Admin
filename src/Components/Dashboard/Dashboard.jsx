import React, { useState } from 'react';
import { useGetOrderQuery } from '../../features/order/orderSlice';
import { useGetAllProductQuery } from '../../features/product/productApiSlice';
import {
  useGetAllUserQuery,
  useShowUserQuery,
} from '../../features/users/userSlice';
import Monthly from '../Charts/Monthly';
import UserInfor from '../Navbar/UserInfor';
import RecentOrder from '../Order/RecentOrder';
import RecentProduct from '../Product/RecentProduct';
import RecentUser from '../User/RecentUser';
import MobileView from './MobileView';
import WebView from './WebView';

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const { data: order, isSuccess: orderSuccess } = useGetOrderQuery(page);
  const { data, isSuccess } = useGetAllUserQuery();
  const { data: product, isSuccess: productSuccess } = useGetAllProductQuery();
  const { data: showuser, isSuccess: userSuccess } = useShowUserQuery();

  let userData;
  let productData;
  let orderData;
  let showUserData;
  let monthlyRevenue;
  if (isSuccess) {
    userData = data.result;
  }
  if (productSuccess) {
    productData = product.product;
  }
  if (orderSuccess) {
    orderData = order.orders;
    monthlyRevenue = order.monthly;
  }
  if (userSuccess) {
    showUserData = showuser.user;
  }

  return (
    <>
      <div className='relative truncate'>
        <div className='flex justify-between primary2'>
          <div>
            <p className='  font-bold text-2xl mb-8 '>Dashboard</p>
          </div>
          <div className='hidden md:flex justify-end absolute right-0'>
            <UserInfor showUserData={showUserData} />
          </div>
        </div>
        {/* data */}
        <div className='mb-6 md:my-8'>
          {/* mobile */}
          <div className='md:hidden'>
            <MobileView
              userData={userData}
              productData={productData}
              orderData={orderData}
            />
          </div>

          {/* web */}
          <WebView
            userData={userData}
            productData={productData}
            orderData={orderData}
          />
        </div>
        <div className='overflow-x-auto mb-8 rounded-lg '>
          <Monthly monthlyRevenue={monthlyRevenue} />
        </div>
        <div className='md:grid md:grid-cols-[2fr_1fr] md:gap-8'>
          <RecentUser userData={userData} />
          <RecentProduct productData={productData} />
        </div>
        <div>
          <RecentOrder orderData={orderData} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoFastFoodOutline } from 'react-icons/io5';

const WebView = ({ userData, productData, orderData }) => {
  const total =
    orderData &&
    orderData.reduce(
      (a, b) => a + Number(b.items.length),

      0
    );

  return (
    <div className='web hidden md:block overflow-x-auto'>
      <div className='flex gap-8 md:justify-between'>
        {/* data1 */}
        <div className='flex items-center gap-4 h-fit p-10 bg-clr text-white rounded-md'>
          <div>
            <HiOutlineUserGroup className='p-3 greenlight text-7xl md:text-8xl rounded-md' />
          </div>
          <div className='font-bold flex flex-col items-center  gap-1 text-lg md:text-2xl'>
            <div>{userData && userData.length}</div>
            <div>{userData && userData.length > 1 ? 'Users' : 'User'}</div>
          </div>
        </div>
        {/* end data1 */}
        {/* data2 */}
        <div className='flex items-center gap-4 h-fit p-10 bg-lightblue  text-white rounded-md'>
          <div>
            <IoFastFoodOutline className='p-3 bg-white text-7xl md:text-8xl rounded-md text-red-400' />
          </div>
          <div className='font-bold flex flex-col  items-center gap-1 text-lg md:text-2xl'>
            <div>{productData && productData.length}</div>
            <div>
              {productData && productData.length > 1 ? 'Products' : 'Product'}
            </div>
          </div>
        </div>
        {/* end data2 */}
        {/* data3 */}
        <div className='flex items-center gap-4 h-fit p-10 bg-text  text-white rounded-md'>
          <div>
            <BsBoxSeam className='p-3 bg-white text-7xl md:text-8xl rounded-md primary' />
          </div>
          <div className='font-bold flex flex-col  items-center gap-1 text-lg md:text-2xl'>
            <div>{total}</div>
            <div>{total > 1 ? 'Orders' : 'Order'}</div>
          </div>
        </div>
        {/* end data3 */}
      </div>
    </div>
  );
};

export default WebView;

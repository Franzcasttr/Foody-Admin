import React from 'react';

const OrderTable = ({ orderData }) => {
  return (
    <div className='bg-white p-4  rounded-lg mb-2 overflow-x-auto'>
      <table className='border-collapse w-full'>
        <thead className='text-left border-b-2 border-b-gray-400'>
          <tr>
            <th className='sticky pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Customer
            </th>
            <th className='pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Address
            </th>
            <th className='pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Menu
            </th>
            <th className='pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Status
            </th>
          </tr>
        </thead>
        {orderData &&
          orderData.map((data, index) => {
            const { user, addressId, items, orderStatus } = data;
            const { name: userName, profileimage } = user;
            const { street, province, city, barangay, postalcode } = addressId;

            const item = items.map((item, index) => {
              const { productId } = item;
              return (
                <div key={index}>
                  {productId.name}
                  <br />
                </div>
              );
            });

            return (
              <tbody key={index} className=''>
                <tr>
                  <td className='pr-24 mb-8 py-4 border-b-[1px] border-gray-400 tracking-wide primary2 '>
                    <div className='flex gap-3 items-center'>
                      <img
                        src={profileimage}
                        alt={userName}
                        className='w-[44px] h-[43px] rounded-full  object-cover'
                      />
                      <p>{userName}</p>
                    </div>
                  </td>
                  <td className='pr-8 mb-8 py-4 border-b-[1px] border-gray-400 tracking-wide primary2 '>
                    {street}, {barangay}, {province},<br />
                    {city}, {postalcode}
                  </td>
                  <td className='pr-8 mb-8 py-4 border-b-[1px] border-gray-400 tracking-wide primary2'>
                    {item}
                  </td>
                  <td className='pr-8 mb-8 py-4 border-b-[1px] border-gray-400 tracking-wide primary2'>
                    {(orderStatus === 'completed' && (
                      <div className='p-2 bg-clr rounded-full text-white text-center'>
                        {orderStatus}
                      </div>
                    )) ||
                      (orderStatus === 'preparing' && (
                        <div className='p-2 bg-text rounded-full text-white text-center'>
                          {orderStatus}
                        </div>
                      )) ||
                      (orderStatus === 'delivered' && (
                        <div className='p-2 bg-lightblue rounded-full text-white text-center'>
                          {orderStatus}
                        </div>
                      ))}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default OrderTable;

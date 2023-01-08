import React from 'react';
import formatPrice from '../../Utils/Helper';

const RecentProduct = ({ productData }) => {
  return (
    <div className='my-9 p-5 text-left bg-white rounded-lg overflow-x-auto'>
      <p className='text-xl mb-4'>Latest Product</p>
      <table className='border-collapse w-full '>
        <thead className='bg-text text-white'>
          <tr>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Image
            </th>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Product Name
            </th>
            <th className='p-3 text-lg font-semibold tracking-wide text-left'>
              Price
            </th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {productData &&
            productData.slice(0, 5).map((product, index) => {
              const { name, image, price } = product;
              return (
                <tr key={index}>
                  <td className='p-3 text-lg tracking-wide primary2 text-left'>
                    <img src={image} alt={name} height={20} width={50} />
                  </td>
                  <td className='p-3 text-lg tracking-wide primary2 text-left'>
                    {name}
                  </td>
                  <td className='p-3 text-lg tracking-wide primary2 text-left'>
                    {formatPrice(price)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentProduct;

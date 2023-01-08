import React from 'react';
import { MdDeleteSweep } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import formatPrice from '../../Utils/Helper';

const ProductTable = ({
  setOpenEditForm,
  setConfirmation,
  productData,
  setEditProduct,
  setDeleteProd,
}) => {
  return (
    <div className='hidden md:block bg-white p-4 mt-4 rounded-lg mb-4'>
      <table className='border-collapse w-full'>
        <thead className='text-left'>
          <tr>
            <th className='pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Images
            </th>
            <th className='pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Name
            </th>
            <th className='pb-4 text-lg font-bold primary2 tracking-wide text-left'>
              Price
            </th>
          </tr>
        </thead>
        {productData &&
          productData.map((data, index) => {
            const { _id, name, image, price } = data;
            return (
              <tbody
                key={index}
                className='items-center primary2 font-semibold'>
                <tr>
                  <td className='py-4'>
                    <img
                      src={image}
                      alt={name}
                      className='w-[91px] h-[70px] rounded-lg object-contain'
                    />
                  </td>
                  <td className='py-4'>
                    <p>{name}</p>
                  </td>
                  <td className='py-4'>
                    <p>{formatPrice(price)}</p>
                  </td>
                  <td className=' text-3xl py-4'>
                    <div className='flex gap-8'>
                      <button
                        className='cursor-pointer text-[#F9258B]'
                        onClick={() => {
                          setConfirmation(true);
                          setDeleteProd(_id);
                        }}>
                        <MdDeleteSweep />
                      </button>
                      <button
                        className='cursor-pointer primary'
                        onClick={() => {
                          setOpenEditForm(true);
                          setEditProduct(data);
                        }}>
                        <RiPencilFill />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default ProductTable;

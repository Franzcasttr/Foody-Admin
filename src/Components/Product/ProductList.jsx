import React, { useState } from 'react';
// import { ProductData } from '../../assets/data/productsdata';
import { MdDeleteSweep } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import ProductTable from './ProductTable';
import Pagination from '../Paginations/Pagination';
import AddForm from './AddForm';
import { motion, AnimatePresence } from 'framer-motion';
import {
  contentVariant,
  cotainerVariant,
  mainContentVariant,
} from '../../Utils/Modal';
import EditForm from './EditForm';
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from '../../features/product/productApiSlice';
import Loading from '../../Utils/Loading';
import formatPrice from '../../Utils/Helper';
import { useGetCategoryQuery } from '../../features/category/categoryApiSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const [addnew, setAddnew] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [editProduct, setEditProduct] = useState([]);
  const [deleteProd, setDeleteProd] = useState();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [searchQuery, setsearchQuery] = useState('');

  const { data, isLoading, isSuccess, isError, error } = useGetProductQuery({
    page,
    searchQuery,
  });
  const { data: category, isSuccess: success } = useGetCategoryQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const token = useSelector(selectCurrentToken);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  let productData;

  if (token && isSuccess) {
    productData = data.product;
  }

  let CategoryData;
  if (success) {
    CategoryData = category.result;
  }

  const categoryContent =
    CategoryData &&
    CategoryData.map((item) => {
      return item.name;
    });

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsearchQuery(value);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteProd);
      setConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='relative'>
      <p className='py-8 primary2 font-bold text-2xl'>Product List</p>
      <div>
        <form
          onSubmit={handleSubmit}
          className='bg-white w-full p-4 flex mb-4 rounded-lg'>
          <input
            type='text'
            placeholder='Search for product'
            className='w-full outline-none'
            value={value}
            onChange={handleChange}
          />
          <button className='primary' onClick={handleSubmit}>
            Search
          </button>
        </form>
      </div>
      <div className='flex justify-end'>
        <button
          className='p-2 text-white bg-clr rounded-lg cursor-pointer'
          onClick={() => setAddnew(!addnew)}>
          Add New
        </button>
      </div>
      {/* addnew */}
      <AnimatePresence>
        {addnew && (
          <>
            <motion.div
              variants={cotainerVariant}
              initial='hidden'
              animate='vissible'
              exit='exit'
              className='modal-backdrop'
              onClick={() => setAddnew(false)}
            />
            <motion.div
              variants={contentVariant}
              initial='hidden'
              animate='vissible'
              exit='exit'
              className='modal-content md:w-[95vw]'>
              <motion.div
                variants={mainContentVariant}
                initial='hidden'
                animate='vissible'
                exit='exit'
                className='main-content'>
                <AddForm
                  setAddnew={setAddnew}
                  categoryContent={categoryContent}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* edit form */}
      <AnimatePresence>
        {openEditForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='modal-backdrop'
              onClick={() => setOpenEditForm(false)}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='modal-content'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <EditForm
                  setOpenEditForm={setOpenEditForm}
                  editProduct={editProduct}
                  categoryContent={categoryContent}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* end edit form */}
      <AnimatePresence>
        {confirmation && (
          <>
            <motion.div
              variants={cotainerVariant}
              initial='hidden'
              animate='vissible'
              exit='exit'
              className='modal-backdrop'></motion.div>
            <motion.div
              variants={contentVariant}
              initial='hidden'
              animate='vissible'
              exit='exit'
              className='content md:w-[70vw]'>
              <motion.div
                variants={mainContentVariant}
                initial='hidden'
                animate='vissible'
                exit='exit'
                className='delete'>
                <p>Are you sure you want to remove?</p>
                <div className='flex gap-4 mt-8'>
                  <button
                    className='p-2 text-black bg-white rounded-lg cursor-pointer'
                    onClick={() => setConfirmation(false)}>
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className='p-2 text-white bg-[#f5a4b5] rounded-lg cursor-pointer'>
                    Remove
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* web table */}
      <ProductTable
        setOpenEditForm={setOpenEditForm}
        setConfirmation={setConfirmation}
        productData={productData}
        setEditProduct={setEditProduct}
        setDeleteProd={setDeleteProd}
      />
      {/* mobile */}
      <div className='mt-4 md:hidden'>
        {productData &&
          productData.map((data, index) => {
            const { _id, name, image, price } = data;

            return (
              <div
                key={index}
                className='my-4 p-4 bg-white relative rounded-lg'>
                <div className='flex gap-5'>
                  <img
                    src={image}
                    alt={name}
                    className='w-[116px] h-[117px] rounded-lg object-contain'
                  />
                  <div className='flex flex-col gap-3 font-semibold'>
                    <p>{name}</p>
                    <p className='text-[#fd8f4f]'>{formatPrice(price)}</p>
                  </div>
                </div>
                <div className='absolute right-4 bottom-4 text-3xl'>
                  <div className='flex gap-4'>
                    <button
                      className='cursor-pointer text-[#F9258B]'
                      onClick={async () => {
                        setConfirmation(!confirmation);
                        setDeleteProd(_id);
                      }}>
                      <MdDeleteSweep />
                    </button>
                    <button
                      className='cursor-pointer primary'
                      onClick={() => {
                        setOpenEditForm(!openEditForm);
                        setEditProduct(data);
                      }}>
                      <RiPencilFill />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* end mobile */}
      {data.numberOfPages > 1 && (
        <Pagination
          productPaginate={data.numberOfPages}
          setPage={setPage}
          page={page}
        />
      )}
    </div>
  );
};

export default ProductList;

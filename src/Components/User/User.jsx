import React, { useState } from 'react';
import { MdDeleteSweep } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import UserPagination from '../Paginations/UserPagination';
import UserEditForm from './UserEditForm';
import UserTable from './UserTable';
import { motion, AnimatePresence } from 'framer-motion';
import {
  contentVariant,
  cotainerVariant,
  mainContentVariant,
} from '../../Utils/Modal';
import Loading from '../../Utils/Loading';
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../features/users/userSlice';

const User = () => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [editUser, setEditUser] = useState([]);
  const [deleteUsers, setDeleteUsers] = useState();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [searchQuery, setsearchQuery] = useState('');
  const { data, isLoading, isSuccess } = useGetUserQuery({
    page,
    searchQuery,
  });
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  let userData;
  let numberOfPages;

  if (updateLoading) {
    return <Loading />;
  }
  if (isLoading) {
    return <Loading />;
  } else if (isSuccess) {
    userData = data.user;
    numberOfPages = data.numberOfPages;
  }

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsearchQuery(value);
  };

  const handleDelete = async () => {
    setConfirmation(false);
    try {
      await deleteUser(deleteUsers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p className='py-8 primary2 font-bold text-2xl'>User List</p>
      <div>
        <form
          onSubmit={handleSubmit}
          className='bg-white w-full p-4 flex mb-4 rounded-lg'>
          <input
            type='text'
            placeholder='Search for user'
            className='w-full outline-none'
            value={value}
            onChange={handleChange}
          />
          <button className='primary' onClick={handleSubmit}>
            Search
          </button>
        </form>
      </div>
      {userData < 1 ? (
        <div className='flex justify-center mt-8'>
          <p className='text-2xl text-gray-400'>No User has been found</p>
        </div>
      ) : (
        <>
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
                  className='user-content'>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <UserEditForm
                      setOpenEditForm={setOpenEditForm}
                      editUser={editUser}
                      updateUser={updateUser}
                    />
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

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
                        className='p-2 text-white bg-[#f5a4b5] rounded-lg cursor-pointer'
                        onClick={handleDelete}>
                        Remove
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className='hidden md:block'>
            <UserTable
              setOpenEditForm={setOpenEditForm}
              setConfirmation={setConfirmation}
              userData={userData}
              setEditUser={setEditUser}
              setDeleteUser={setDeleteUsers}
            />
          </div>

          <div className=' md:hidden'>
            {userData &&
              userData.map((data, index) => {
                const { _id, name, profileimage, email, role } = data;

                return (
                  <div
                    key={index}
                    className='my-4 p-4 bg-white relative rounded-lg'>
                    <div className='flex flex-col items-center text-center gap-5'>
                      <img
                        src={profileimage}
                        alt={name}
                        className='w-[116px] h-[117px] rounded-lg object-cover'
                      />

                      <p className='capitalize'>{name}</p>
                      <p>{email}</p>
                      <p className='uppercase text-red-500'>{role}</p>

                      <div className='text-3xl'>
                        <div className='flex gap-4'>
                          <button
                            className='cursor-pointer text-[#F9258B]'
                            onClick={() => {
                              setConfirmation(true);
                              setDeleteUsers(_id);
                            }}>
                            <MdDeleteSweep />
                          </button>
                          <button
                            className='cursor-pointer primary'
                            onClick={() => {
                              setOpenEditForm(true);
                              setEditUser(data);
                            }}>
                            <RiPencilFill />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {numberOfPages > 1 && (
            <UserPagination
              page={page}
              setPage={setPage}
              numberOfPages={numberOfPages}
            />
          )}
        </>
      )}
    </div>
  );
};

export default User;

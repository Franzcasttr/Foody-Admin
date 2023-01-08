import React, { useEffect, useRef, useState } from 'react';
import { GiExitDoor } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import { logOut } from '../../features/auth/authSlice';

const UserInfor = ({ showUserData }) => {
  const [openUser, setOpenUser] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { data }] = useLogoutMutation();

  useEffect(() => {
    const getClickOutside = (e) => {
      if (openUser && e.target !== menuRef.current) {
        setOpenUser(false);
      }
    };
    document.addEventListener('click', getClickOutside);
    return () => {
      document.removeEventListener('click', getClickOutside);
    };
  }, [openUser]);

  const handleClick = async () => {
    await logout();
    dispatch(logOut());
  };
  if (data) {
    navigate('/login');
  }

  return (
    <div>
      <div onClick={() => setOpenUser(!openUser)}>
        <div className='flex flex-row-reverse items-center gap-3'>
          <p className='hidden md:block font-bold text-lg'>
            {showUserData && showUserData.name}
          </p>
          <img
            src={showUserData && showUserData.profileimage}
            alt={showUserData && showUserData.name}
            className='w-10 h-10 rounded-full object-cover cursor-pointer'
            ref={menuRef}
          />
        </div>
      </div>
      {openUser && (
        <AnimatePresence>
          <motion.div
            initial={{ y: 0, scale: 0 }}
            animate={{ y: 6, scale: 1 }}
            exit={{ y: 0, scale: 0 }}
            className='user-menu primary2'>
            <p className='mb-2 mt-[-1rem]'>Welcome Admin !</p>
            <div className=''>{showUserData && showUserData.name}</div>
            <div className='flex gap-2 bg-[#F9FAFC] font-bold p-1 mt-3'>
              <GiExitDoor className='secondary text-xl' />
              <button className='secondary' onClick={handleClick}>
                Logout
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default UserInfor;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import { RiMenuFoldLine } from 'react-icons/ri';
import { GiExitDoor } from 'react-icons/gi';
import { motion } from 'framer-motion';

import { NavData } from '../../assets/data/navdata';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';
const Sidebar = ({ setToggleSidebar, screenSize }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { data }] = useLogoutMutation();
  const handleClick = async () => {
    await logout();
    dispatch(logOut());
    setToggleSidebar(false);
  };
  if (data) {
    navigate('/login');
  }
  return (
    <motion.div
      initial={{ x: -6 }}
      animate={{ x: 1 }}
      className='flex flex-col fixed top-0 left-0 h-full w-[13rem] p-4 bg-white md:w-[15rem] md:p-9 md:border-r-[1px] z-40 border-gray-200'>
      <div className='flex justify-between text-3xl md:text-4xl font-bold mb-4 cursor-pointer primary'>
        <div></div>
        <RiMenuFoldLine onClick={() => setToggleSidebar(false)} />
      </div>
      <div className='p-3 md:mb-4  md:block'>
        <Logo />
      </div>

      {NavData.map((data, index) => {
        const { name, link, icon } = data;

        return (
          <div key={index}>
            <NavLink
              to={link}
              className='flex gap-2 md:gap-4 text-gray-500 p-3'
              onClick={() => {
                if (screenSize <= 900) {
                  setToggleSidebar(false);
                } else {
                  setToggleSidebar(true);
                }
              }}>
              <div className='text-xl'>{icon}</div>
              <span>{name}</span>
            </NavLink>
          </div>
        );
      })}
      <div className='flex gap-2 bg-[#F9FAFC] font-bold p-3 mt-6'>
        <GiExitDoor className='secondary text-xl' />
        <button className='secondary' onClick={handleClick}>
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;

import React from 'react';
import { useShowUserQuery } from '../../features/users/userSlice';

import UserInfor from './UserInfor';
const Navbar = () => {
  const { data: showuser, isSuccess: userSuccess } = useShowUserQuery();
  let showUserData;
  if (userSuccess) {
    showUserData = showuser.user;
  }

  return (
    <div className='my-5'>
      <UserInfor showUserData={showUserData} />
    </div>
  );
};

export default Navbar;

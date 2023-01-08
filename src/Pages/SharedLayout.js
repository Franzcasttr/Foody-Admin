import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../Components/Logo';
import Sidebar from '../Components/Navbar/Sidebar';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import Navbar from '../Components/Navbar/Navbar';

const SharedLayout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleSize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleSize);

    handleSize();
    return () => window.removeEventListener('resize', handleSize);
    // eslint-disable-next-line
  }, []);

  return (
    <main className='truncate'>
      <div>
        <div className='hidden md:flex mt-3 md:mt-8 md:items-center cursor-pointer '>
          <RiMenuUnfoldLine
            className={
              toggleSidebar
                ? 'hidden'
                : 'mx-4 text-3xl md:ml-[2rem] md:text-4xl primary'
            }
            onClick={() => setToggleSidebar(true)}
          />

          <Logo />
        </div>
        <div className='flex justify-between items-center relative mt-3 md:hidden section-center'>
          <RiMenuUnfoldLine
            className='text-3xl md:ml-[2rem] md:text-4xl primary'
            onClick={() => setToggleSidebar(true)}
          />
          <Navbar />
        </div>

        {toggleSidebar && (
          <div className={toggleSidebar ? 'block' : 'hidden md:block'}>
            <Sidebar
              setToggleSidebar={setToggleSidebar}
              screenSize={screenSize}
            />
          </div>
        )}
      </div>

      <div className='mt-4 md:mt-0'>
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;

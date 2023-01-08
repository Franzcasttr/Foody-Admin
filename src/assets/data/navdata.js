import { BiCategoryAlt } from 'react-icons/bi';
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { SiNintendogamecube } from 'react-icons/si';

export const NavData = [
  {
    id: 1,
    link: '/',
    name: 'Dashboard',
    icon: <SiNintendogamecube />,
  },
  {
    id: 2,
    link: '/products',
    name: 'Products',
    icon: <IoFastFoodOutline />,
  },
  {
    id: 3,
    link: '/orders',
    name: 'Orders',
    icon: <BsBoxSeam />,
  },
  {
    id: 4,
    link: '/users',
    name: 'Users',
    icon: <HiOutlineUserGroup />,
  },
  {
    id: 5,
    link: '/categories',
    name: 'Categories',
    icon: <BiCategoryAlt />,
  },
];

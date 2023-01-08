import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <h1>
      <Link to='/' className='primary text-3xl font-bold'>
        Foody
      </Link>
    </h1>
  );
};

export default Logo;

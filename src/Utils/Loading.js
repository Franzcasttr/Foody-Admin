import React from 'react';
import { motion } from 'framer-motion';
import { circleStyle, containerStyle, spinTransition } from './Modal';

const Loading = () => {
  return (
    <div className='flex justify-center items-center mt-4'>
      <div style={containerStyle}>
        <motion.span
          style={circleStyle}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
      </div>
    </div>
  );
};

export default Loading;

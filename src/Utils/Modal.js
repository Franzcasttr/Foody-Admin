export const cotainerVariant = {
  hidden: {
    opacity: 0,
  },
  vissible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
};

export const contentVariant = {
  hidden: {
    scale: 0,
  },
  vissible: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    scale: 0,
    transition: {
      delay: 0.3,
    },
  },
};

export const mainContentVariant = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  vissible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const circleStyle = {
  width: '4rem',
  height: '4rem',
  border: '0.5rem solid #e9e9e9',
  borderTop: '0.5rem solid #3498db',
  borderRadius: '50%',
  position: 'absolute',
  boxSizing: 'border-box',
};
export const containerStyle = {
  position: 'relative',
  width: '4rem',
  height: '4rem',
};
export const spinTransition = {
  repeat: Infinity,
  duration: 1,
  ease: 'linear',
};

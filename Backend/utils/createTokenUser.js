const createTokenUser = (user) => {
  return {
    userID: user._id,
    role: user.role,
  };
};

export default createTokenUser;

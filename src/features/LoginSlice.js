import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  loading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getLogin: (state) => {},
  },
});

export const { getLogin } = loginSlice.actions;

export default loginSlice.reducer;

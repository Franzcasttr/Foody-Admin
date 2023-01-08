import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from '../api/apiSlice';
import loginReducer from '../features/LoginSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),

  devTools: false,
});

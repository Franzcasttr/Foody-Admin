import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://web-production-0c56.up.railway.app/api/v1',
  credentials: 'include',
  prepareHeaders: async (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (arg, api, extraOptions) => {
  let result = await baseQuery(arg, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery('admin/refresh', api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data));
      result = await baseQuery(arg, api, extraOptions);
    } else {
      console.log('logout');
      api.dispatch(logOut());
    }
  }

  return result;
};

export const mainApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,

  tagTypes: ['Product', 'User', 'Category'],
  endpoints: (builder) => ({}),
});
// export const mainApi = createApi({
//   reducerPath: 'adminApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:8000/api/v1',
//     credentials: 'include',

//   }),

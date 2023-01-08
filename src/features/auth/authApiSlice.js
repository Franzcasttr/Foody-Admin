import { mainApi } from '../../api/apiSlice';

export const authApiSlice = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'admin/auth/adminlogin',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'admin/auth/adminlogout',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;

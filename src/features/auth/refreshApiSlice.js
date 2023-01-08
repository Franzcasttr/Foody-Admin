import { mainApi } from '../../api/apiSlice';

export const refreshApiSlice = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.query({
      query: () => 'admin/refresh',
      credentials: 'include',
    }),
  }),
});

export const { useRefreshQuery } = refreshApiSlice;

import { mainApi } from '../../api/apiSlice';

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ page = 1, searchQuery }) =>
        `admin/user/getAllPaginatedusers?page=${page}&searchQuery=${searchQuery}`,

      providesTags: (result, error, args) => [
        { type: 'User', id: 'LIST' },
        { ...result.user.map(({ id }) => ({ type: 'User', id })) },
      ],
    }),

    showUser: builder.query({
      query: () => 'admin/user/showMe',
    }),

    getAllUser: builder.query({
      query: () => 'admin/user/getAllusers',
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/user/removeUser/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    updateUser: builder.mutation({
      query: (initialQuery) => ({
        url: 'admin/user/updateUser',
        method: 'PATCH',
        body: initialQuery,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useShowUserQuery,
} = userApi;

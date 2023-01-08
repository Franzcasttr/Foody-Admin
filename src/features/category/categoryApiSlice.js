import { mainApi } from '../../api/apiSlice';

export const category = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => '/category/fetchCategory',
      providesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    createCategory: builder.mutation({
      query: (initalCategory) => ({
        url: '/category/createCategory',
        method: 'POST',
        body: initalCategory,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});
export const { useGetCategoryQuery, useCreateCategoryMutation } = category;

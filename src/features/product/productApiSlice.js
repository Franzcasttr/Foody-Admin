import { mainApi } from '../../api/apiSlice';

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ page = 1, searchQuery }) =>
        `product/getPaginateProducts?page=${page}&searchQuery=${searchQuery}`,

      providesTags: (result, error, args) => [
        { type: 'Product', id: 'LIST' },
        { ...result.product.map(({ id }) => ({ type: 'Product', id })) },
      ],
    }),
    getAllProduct: builder.query({
      query: () => 'product/',

      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    addProduct: builder.mutation({
      query: (initialQuery) => ({
        url: 'product/createProduct',
        method: 'POST',
        body: initialQuery,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation({
      query: (initialQuery) => ({
        url: 'product/updateProduct',
        method: 'PATCH',
        body: initialQuery,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/delete/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Product', id: arg.id },
      ],
    }),
  }),
});
export const {
  useGetProductQuery,
  useGetAllProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;

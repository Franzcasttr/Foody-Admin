import { mainApi } from '../../api/apiSlice';

export const orderApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (page = 1) => `order/getAllOrders?page=${page}`,
    }),
  }),
});

export const { useGetOrderQuery } = orderApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://3bf8-140-113-66-251.ngrok-free.app/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getOrder: builder.query({
      query: (ref) => `orders/${ref}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = apiSlice;

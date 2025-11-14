import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://assignment-5-ivory-phi.vercel.app/api/v1' }),
    tagTypes: ["Auth", "Users", "Parcels"],
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ['Users'],
        }),
        getSingleBook: builder.query({
            query: (id: string) => `/books/${id}`,
            providesTags: ['Users'],
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Auth'],
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: '/users/register',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Users'],
        }),
    })
})

export const { useGetBooksQuery, useGetSingleBookQuery, useLoginMutation, useRegisterMutation } = baseApi;

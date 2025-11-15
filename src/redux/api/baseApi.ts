import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://assignment-5-ivory-phi.vercel.app/api/v1',
        baseUrl: 'http://localhost:5000/api/v1',
        credentials: "include"
    }),
    tagTypes: ["Parcels"],
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload
            })
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: '/users/register',
                method: 'POST',
                body: payload
            })
        }),
        createParcel: builder.mutation({
            query: (payload) => ({
                url: '/parcels',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ["Parcels"]
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            })
        }),
        getMe: builder.query({
            query: () => "/auth/me",
        }),
        getMyParcels: builder.query({
            query: () => "/parcels/me",
            providesTags: ["Parcels"]
        }),
        cancleParcel: builder.mutation({
            query: (id) => ({
                url: `/parcels/${id}/cancel`,
                method: "PATCH",
            }),
            invalidatesTags: ['Parcels'],
        }),

    })
})

export const { useLoginMutation, useRegisterMutation, useCreateParcelMutation, useLogoutMutation, useGetMeQuery, useGetMyParcelsQuery, useCancleParcelMutation } = baseApi;

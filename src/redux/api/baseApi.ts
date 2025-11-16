import { config } from '@/config';
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.baseUrl,
        credentials: "include"
    }),
    tagTypes: ["Parcels", "Users"],
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
        getAllParcels: builder.query({
            query: () => "/parcels",
        }),
        getAllUsers: builder.query({
            query: () => "/users",
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
        confirmParcel: builder.mutation({
            query: (id) => ({
                url: `/parcels/${id}/confirm`,
                method: "PATCH",
            }),
            invalidatesTags: ['Parcels'],
        }),
        updateUserStatus: builder.mutation({
            query: (payload) => ({
                url: `/users/${payload.id}/status`,
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ['Users'],
        }),
        updateParcelStatus: builder.mutation({
            query: (payload) => ({
                url: `/parcels/${payload.id}/status`,
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ['Parcels'],
        }),
        getIncomingParcels: builder.query({
            query: () => ({
                url: `/parcels/incoming`,
            }),
        }),

    })
})

export const { useLoginMutation, useRegisterMutation, useCreateParcelMutation, useLogoutMutation, useGetMeQuery, useGetMyParcelsQuery, useCancleParcelMutation, useGetIncomingParcelsQuery, useConfirmParcelMutation, useGetAllParcelsQuery, useGetAllUsersQuery, useUpdateUserStatusMutation, useUpdateParcelStatusMutation } = baseApi;

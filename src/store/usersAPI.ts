import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUsersAPI } from '../types/usersAPItypes'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  tagTypes: ['Users'],
  endpoints: ({ query, mutation }) => ({
    getUsers: query<IUsersAPI[], undefined>({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    getUserById: query<IUsersAPI, number>({
      query: (id) => ({ url: `users/${id}` }),
      providesTags: ['Users'],
    }),
    addUser: mutation<IUsersAPI, Omit<IUsersAPI, 'id'>>({
      query: (body) => ({
        url: `users`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: mutation<IUsersAPI, IUsersAPI>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation, useUpdateUserMutation } = usersAPI

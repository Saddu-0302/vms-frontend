import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
        credentials: "include"
    }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/fetch",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["user"]
            }),
            addUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/create",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),
            login: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),
            logout: builder.mutation<void, void>({
                query: () => {
                    return {
                        url: "/logout",
                        method: "POST",
                    }
                },
                invalidatesTags: ["user"]
            }),

        }
    }
})

export const { useGetUsersQuery, useAddUserMutation, useLoginMutation, useLogoutMutation } = userApi

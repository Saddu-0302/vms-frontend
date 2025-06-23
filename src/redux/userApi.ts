import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
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

        }
    }
})

export const { useGetUsersQuery, useAddUserMutation } = userApi

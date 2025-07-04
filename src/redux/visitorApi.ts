import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const visitorApi = createApi({
    reducerPath: "visitorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
        credentials: "include"
    }),
    tagTypes: ["visitor"],
    endpoints: (builder) => {
        return {
            getAllVisitors: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["visitor"]
            }),
            addVisitor: builder.mutation({
                query: visitorData => {
                    return {
                        url: "/add-visitor",
                        method: "POST",
                        body: visitorData
                    }
                },
                invalidatesTags: ["visitor"]
            }),

        }
    }
})

export const { useGetAllVisitorsQuery, useAddVisitorMutation } = visitorApi

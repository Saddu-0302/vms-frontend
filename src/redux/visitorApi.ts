import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const visitorApi = createApi({
    reducerPath: "visitorApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
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

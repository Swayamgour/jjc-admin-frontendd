import { baseApi } from "../../app/baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (params = {}) => ({ url: "/services", params }),
      providesTags: ["Services"],
    }),
    getService: builder.query({
      query: (slug) => `/services/${slug}`,
      providesTags: (r, e, slug) => [{ type: "Services", id: slug }],
    }),
    createService: builder.mutation({
      query: (body) => ({ url: "/services", method: "POST", body }),
      invalidatesTags: ["Services"],
    }),
    updateService: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/services/${slug}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Services"],
    }),
    toggleServicePublish: builder.mutation({
      query: (id) => ({ url: `/services/${id}/publish`, method: "PATCH" }),
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation({
      query: (slug) => ({ url: `/services/${slug}`, method: "DELETE" }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useToggleServicePublishMutation,
  useDeleteServiceMutation,
} = servicesApi;

import { baseApi } from "../../app/baseApi";
export const industriesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getIndustries: b.query({ query: (p={}) => ({ url: "/industries", params: p }), providesTags: ["Industries"] }),
    createIndustry: b.mutation({ query: (body) => ({ url: "/industries", method: "POST", body }), invalidatesTags: ["Industries"] }),
    updateIndustry: b.mutation({ query: ({ slug, ...body }) => ({ url: `/industries/${slug}`, method: "PUT", body }), invalidatesTags: ["Industries"] }),
    toggleIndustryPublish: b.mutation({ query: (slug) => ({ url: `/industries/${slug}/publish`, method: "PATCH" }), invalidatesTags: ["Industries"] }),
    deleteIndustry: b.mutation({ query: (slug) => ({ url: `/industries/${slug}`, method: "DELETE" }), invalidatesTags: ["Industries"] }),
  }),
});
export const { useGetIndustriesQuery, useCreateIndustryMutation, useUpdateIndustryMutation, useToggleIndustryPublishMutation, useDeleteIndustryMutation } = industriesApi;

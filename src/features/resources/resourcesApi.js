import { baseApi } from "../../app/baseApi";
export const resourcesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getResources: b.query({ query: (p={}) => ({ url: "/resources", params: p }), providesTags: ["Resources"] }),
    createResource: b.mutation({ query: (body) => ({ url: "/resources", method: "POST", body }), invalidatesTags: ["Resources"] }),
    updateResource: b.mutation({ query: ({ slug, ...body }) => ({ url: `/resources/${slug}`, method: "PUT", body }), invalidatesTags: ["Resources"] }),
    toggleResourcePublish: b.mutation({ query: (slug) => ({ url: `/resources/${slug}/publish`, method: "PATCH" }), invalidatesTags: ["Resources"] }),
    deleteResource: b.mutation({ query: (slug) => ({ url: `/resources/${slug}`, method: "DELETE" }), invalidatesTags: ["Resources"] }),
  }),
});
export const { useGetResourcesQuery, useCreateResourceMutation, useUpdateResourceMutation, useToggleResourcePublishMutation, useDeleteResourceMutation } = resourcesApi;

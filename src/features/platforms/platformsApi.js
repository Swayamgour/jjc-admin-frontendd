import { baseApi } from "../../app/baseApi";

export const platformsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlatforms: builder.query({
      query: (params = {}) => ({ url: "/platforms", params }),
      providesTags: ["Platforms"],
    }),
    getPlatform: builder.query({
      query: (slug) => `/platforms/${slug}`,
    }),
    createPlatform: builder.mutation({
      query: (body) => ({ url: "/platforms", method: "POST", body }),
      invalidatesTags: ["Platforms"],
    }),
    updatePlatform: builder.mutation({
      query: ({ slug, body }) => ({ url: `/platforms/${slug}`, method: "PUT", body }),
      invalidatesTags: ["Platforms"],
    }),
    togglePlatformPublish: builder.mutation({
      query: (id) => ({ url: `/platforms/${id}/publish`, method: "PATCH" }),
      invalidatesTags: ["Platforms"],
    }),
    deletePlatform: builder.mutation({
      query: (slug) => ({ url: `/platforms/${slug}`, method: "DELETE" }),
      invalidatesTags: ["Platforms"],
    }),
  }),
});

export const {
  useGetPlatformsQuery,
  useGetPlatformQuery,
  useCreatePlatformMutation,
  useUpdatePlatformMutation,
  useTogglePlatformPublishMutation,
  useDeletePlatformMutation,
} = platformsApi;

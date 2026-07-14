import { baseApi } from "../../app/baseApi";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------------- Hero (singleton) ---------------- */
    getHomeHero: builder.query({
      query: () => "/home-content/hero",
      providesTags: ["HomeHero"],
    }),
    updateHomeHero: builder.mutation({
      query: (body) => ({ url: "/home-content/hero", method: "PUT", body }),
      invalidatesTags: ["HomeHero"],
    }),

    /* ---------------- Sections ---------------- */
    getHomeSections: builder.query({
      query: () => "/home-content/sections",
      providesTags: ["HomeSections"],
    }),
    getHomeSection: builder.query({
      query: (key) => `/home-content/sections/${key}`,
      providesTags: (result, error, key) => [{ type: "HomeSections", id: key }],
    }),
    updateHomeSectionHeader: builder.mutation({
      query: ({ key, body }) => ({
        url: `/home-content/sections/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { key }) => [
        "HomeSections",
        { type: "HomeSections", id: key },
      ],
    }),
    resetHomeSection: builder.mutation({
      query: (key) => ({ url: `/home-content/sections/${key}`, method: "DELETE" }),
      invalidatesTags: (result, error, key) => [
        "HomeSections",
        { type: "HomeSections", id: key },
      ],
    }),

    /* ---------------- Section Items ---------------- */
    addHomeSectionItem: builder.mutation({
      query: ({ key, body }) => ({
        url: `/home-content/sections/${key}/items`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { key }) => [
        "HomeSections",
        { type: "HomeSections", id: key },
      ],
    }),
    updateHomeSectionItem: builder.mutation({
      query: ({ key, itemId, body }) => ({
        url: `/home-content/sections/${key}/items/${itemId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { key }) => [
        "HomeSections",
        { type: "HomeSections", id: key },
      ],
    }),
    deleteHomeSectionItem: builder.mutation({
      query: ({ key, itemId }) => ({
        url: `/home-content/sections/${key}/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { key }) => [
        "HomeSections",
        { type: "HomeSections", id: key },
      ],
    }),
    reorderHomeSectionItems: builder.mutation({
      query: ({ key, order }) => ({
        url: `/home-content/sections/${key}/items/reorder`,
        method: "PATCH",
        body: { order },
      }),
      invalidatesTags: (result, error, { key }) => [
        "HomeSections",
        { type: "HomeSections", id: key },
      ],
    }),
    uploadHomeSectionItemImage: builder.mutation({
      query: ({ key, itemId, formData }) => ({
        url: `/home-content/sections/${key}/items/${itemId}/image`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { key }) => [
        "HomeSections",
        { type: "HomeSections", id: key },
      ],
    }),
  }),
});

export const {
  useGetHomeHeroQuery,
  useUpdateHomeHeroMutation,
  useGetHomeSectionsQuery,
  useGetHomeSectionQuery,
  useUpdateHomeSectionHeaderMutation,
  useResetHomeSectionMutation,
  useAddHomeSectionItemMutation,
  useUpdateHomeSectionItemMutation,
  useDeleteHomeSectionItemMutation,
  useReorderHomeSectionItemsMutation,
  useUploadHomeSectionItemImageMutation,
} = homeApi;

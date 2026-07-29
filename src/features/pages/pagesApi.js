import { baseApi } from "../../app/baseApi";

export const pagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Get All Pages
    getPages: builder.query({
      query: ({ type, subCategory } = {}) => ({
        url: `/pages/${type}`,
        params: subCategory ? { subCategory } : {},
      }),
      providesTags: (result, error, { type }) => [
        { type: "Page", id: `LIST-${type}` },
      ],
    }),

    // Get Single Page
    getPage: builder.query({
      query: ({ type, slug }) => `/pages/${type}/${slug}`,
      providesTags: (result, error, { type, slug }) => [
        { type: "Page", id: `${type}-${slug}` },
      ],
    }),

    // Create Page
    createPage: builder.mutation({
      query: ({ type, body }) => ({
        url: `/pages/${type}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { type }) => [
        { type: "Page", id: `LIST-${type}` },
      ],
    }),

    // Update Page
    updatePage: builder.mutation({
      query: ({ type, slug, body }) => ({
        url: `/pages/${type}/${slug}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { type, slug }) => [
        { type: "Page", id: `LIST-${type}` },
        { type: "Page", id: `${type}-${slug}` },
      ],
    }),

    // Delete Page
    deletePage: builder.mutation({
      query: ({ type, slug }) => ({
        url: `/pages/${type}/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { type }) => [
        { type: "Page", id: `LIST-${type}` },
      ],
    }),

    // Publish / Unpublish
    togglePagePublish: builder.mutation({
      query: ({ type, id }) => ({
        url: `/pages/${type}/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { type }) => [
        { type: "Page", id: `LIST-${type}` },
      ],
    }),

  }),
});

export const {
  useGetPagesQuery,
  useGetPageQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  useTogglePagePublishMutation,
} = pagesApi;
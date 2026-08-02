import { baseApi } from "../../app/baseApi";

export const guideApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /api/guides?all=true — admin list (includes drafts)
    getGuides: b.query({
      query: (p = {}) => ({ url: "/guides", params: { limit: 100, all: true, ...p } }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map((g) => ({ type: "Guides", id: g._id })), { type: "Guides", id: "LIST" }]
          : [{ type: "Guides", id: "LIST" }],
    }),

    // GET /api/guides/filters
    getGuideFilters: b.query({
      query: () => "/guides/filters",
      providesTags: [{ type: "Guides", id: "FILTERS" }],
    }),

    // GET /api/guides/id/:id — admin edit form (protected, includes drafts)
    getGuideById: b.query({
      query: (id) => `/guides/id/${id}`,
      providesTags: (result, error, id) => [{ type: "Guides", id }],
    }),

    // POST /api/guides
    createGuide: b.mutation({
      query: (body) => ({ url: "/guides", method: "POST", body }),
      invalidatesTags: [{ type: "Guides", id: "LIST" }],
    }),

    // PUT /api/guides/:id
    updateGuide: b.mutation({
      query: ({ id, ...body }) => ({ url: `/guides/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Guides", id },
        { type: "Guides", id: "LIST" },
      ],
    }),

    // DELETE /api/guides/:id
    deleteGuide: b.mutation({
      query: (id) => ({ url: `/guides/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Guides", id: "LIST" }],
    }),
  }),
});

export const {
  useGetGuidesQuery,
  useGetGuideFiltersQuery,
  useGetGuideByIdQuery,
  useCreateGuideMutation,
  useUpdateGuideMutation,
  useDeleteGuideMutation,
} = guideApi;

import { baseApi } from "../../app/baseApi";

export const whitepaperApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /api/whitepapers?all=true — admin list (includes drafts)
    getWhitepapers: b.query({
      query: (p = {}) => ({ url: "/whitepapers", params: { limit: 100, all: true, ...p } }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map((w) => ({ type: "Whitepapers", id: w._id })), { type: "Whitepapers", id: "LIST" }]
          : [{ type: "Whitepapers", id: "LIST" }],
    }),

    // GET /api/whitepapers/filters
    getWhitepaperFilters: b.query({
      query: () => "/whitepapers/filters",
      providesTags: [{ type: "Whitepapers", id: "FILTERS" }],
    }),

    // GET /api/whitepapers/stats
    getWhitepaperLibraryStats: b.query({
      query: () => "/whitepapers/stats",
      providesTags: [{ type: "Whitepapers", id: "STATS" }],
    }),

    // GET /api/whitepapers/id/:id — admin edit form
    getWhitepaperById: b.query({
      query: (id) => `/whitepapers/id/${id}`,
      providesTags: (result, error, id) => [{ type: "Whitepapers", id }],
    }),

    // POST /api/whitepapers
    createWhitepaper: b.mutation({
      query: (body) => ({ url: "/whitepapers", method: "POST", body }),
      invalidatesTags: [{ type: "Whitepapers", id: "LIST" }],
    }),

    // PUT /api/whitepapers/:id
    updateWhitepaper: b.mutation({
      query: ({ id, ...body }) => ({ url: `/whitepapers/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Whitepapers", id },
        { type: "Whitepapers", id: "LIST" },
      ],
    }),

    // DELETE /api/whitepapers/:id
    deleteWhitepaper: b.mutation({
      query: (id) => ({ url: `/whitepapers/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Whitepapers", id: "LIST" }],
    }),
  }),
});

export const {
  useGetWhitepapersQuery,
  useGetWhitepaperFiltersQuery,
  useGetWhitepaperLibraryStatsQuery,
  useGetWhitepaperByIdQuery,
  useCreateWhitepaperMutation,
  useUpdateWhitepaperMutation,
  useDeleteWhitepaperMutation,
} = whitepaperApi;

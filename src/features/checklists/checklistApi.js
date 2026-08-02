import { baseApi } from "../../app/baseApi";

export const checklistApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /api/checklists?all=true — admin list (includes drafts)
    getChecklists: b.query({
      query: (p = {}) => ({ url: "/checklists", params: { limit: 100, all: true, ...p } }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map((c) => ({ type: "Checklists", id: c._id })), { type: "Checklists", id: "LIST" }]
          : [{ type: "Checklists", id: "LIST" }],
    }),

    // GET /api/checklists/filters
    getChecklistFilters: b.query({
      query: () => "/checklists/filters",
      providesTags: [{ type: "Checklists", id: "FILTERS" }],
    }),

    // GET /api/checklists/stats
    getChecklistLibraryStats: b.query({
      query: () => "/checklists/stats",
      providesTags: [{ type: "Checklists", id: "STATS" }],
    }),

    // GET /api/checklists/id/:id — admin edit form
    getChecklistById: b.query({
      query: (id) => `/checklists/id/${id}`,
      providesTags: (result, error, id) => [{ type: "Checklists", id }],
    }),

    // POST /api/checklists
    createChecklist: b.mutation({
      query: (body) => ({ url: "/checklists", method: "POST", body }),
      invalidatesTags: [{ type: "Checklists", id: "LIST" }],
    }),

    // PUT /api/checklists/:id
    updateChecklist: b.mutation({
      query: ({ id, ...body }) => ({ url: `/checklists/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Checklists", id },
        { type: "Checklists", id: "LIST" },
      ],
    }),

    // DELETE /api/checklists/:id
    deleteChecklist: b.mutation({
      query: (id) => ({ url: `/checklists/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Checklists", id: "LIST" }],
    }),
  }),
});

export const {
  useGetChecklistsQuery,
  useGetChecklistFiltersQuery,
  useGetChecklistLibraryStatsQuery,
  useGetChecklistByIdQuery,
  useCreateChecklistMutation,
  useUpdateChecklistMutation,
  useDeleteChecklistMutation,
} = checklistApi;

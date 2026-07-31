import { baseApi } from "../../app/baseApi";

export const caseStudyStoriesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /api/case-study-stories?search=&status=&page=&limit=
    getCaseStudyStories: b.query({
      query: (p = {}) => ({ url: "/case-study-stories", params: { limit: 100, ...p } }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((s) => ({ type: "CaseStudyStories", id: s._id })),
              { type: "CaseStudyStories", id: "LIST" },
            ]
          : [{ type: "CaseStudyStories", id: "LIST" }],
    }),

    // GET /api/case-study-stories/:id — full doc, any status (admin edit form)
    getCaseStudyStoryById: b.query({
      query: (id) => `/case-study-stories/${id}`,
      providesTags: (result, error, id) => [{ type: "CaseStudyStories", id }],
    }),

    // GET /api/case-study-stories/slug/:slug — public detail payload (published only)
    getCaseStudyStoryBySlug: b.query({
      query: (slug) => `/case-study-stories/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "CaseStudyStories", id: `slug-${slug}` }],
    }),

    // Admin "edit by slug" convenience — no admin-scoped get-by-slug route exists on
    // the backend, so resolve slug -> _id via the raw list, then GET /:id.
    getCaseStudyStoryBySlugAdmin: b.query({
      async queryFn(slug, _api, _extra, baseQuery) {
        const listRes = await baseQuery({ url: "/case-study-stories", params: { limit: 500 } });
        if (listRes.error) return { error: listRes.error };

        const match = (listRes.data?.data || []).find((s) => s.slug === slug);
        if (!match) {
          return { error: { status: 404, data: { message: `No story found for slug "${slug}"` } } };
        }

        const fullRes = await baseQuery({ url: `/case-study-stories/${match._id}` });
        if (fullRes.error) return { error: fullRes.error };

        return { data: fullRes.data };
      },
      providesTags: (result, error, slug) => [{ type: "CaseStudyStories", id: `slug-${slug}` }],
    }),

    // POST /api/case-study-stories — plain JSON body
    createCaseStudyStory: b.mutation({
      query: (body) => ({ url: "/case-study-stories", method: "POST", body }),
      invalidatesTags: [{ type: "CaseStudyStories", id: "LIST" }],
    }),

    // PUT /api/case-study-stories/:id — plain JSON body
    updateCaseStudyStory: b.mutation({
      query: ({ id, ...body }) => ({ url: `/case-study-stories/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CaseStudyStories", id },
        { type: "CaseStudyStories", id: "LIST" },
      ],
    }),

    // DELETE /api/case-study-stories/:id
    deleteCaseStudyStory: b.mutation({
      query: (id) => ({ url: `/case-study-stories/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "CaseStudyStories", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCaseStudyStoriesQuery,
  useGetCaseStudyStoryByIdQuery,
  useGetCaseStudyStoryBySlugQuery,
  useGetCaseStudyStoryBySlugAdminQuery,
  useCreateCaseStudyStoryMutation,
  useUpdateCaseStudyStoryMutation,
  useDeleteCaseStudyStoryMutation,
} = caseStudyStoriesApi;

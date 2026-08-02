import { baseApi } from "../../app/baseApi";

export const caseStudiesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /api/case-studies?sourceType=&parentSlug=&status=
    // Raw filtered list — used by the admin table.
    // NOTE: pass no `status` param to see ALL statuses (draft + published + gap slots).
    getCaseStudies: b.query({
      query: (p = {}) => ({ url: "/case-studies", params: p }),
      providesTags: (result) =>
        result?.data
          ? [
            ...result.data.map((c) => ({ type: "CaseStudies", id: c._id })),
            { type: "CaseStudies", id: "LIST" },
          ]
          : [{ type: "CaseStudies", id: "LIST" }],
    }),

    // GET /api/case-studies/:id
    // Full document (any status) — this is what the admin edit form should load from.
    getCaseStudyById: b.query({
      query: (id) => `/case-studies/${id}`,
      providesTags: (result, error, id) => [{ type: "CaseStudies", id }],
    }),

    // GET /api/case-studies/slug/:slug
    // PUBLIC detail-page payload — { caseStudy, related }. Only returns status:"published".
    // Do NOT use this for the admin edit form (drafts/gaps will 404 here).
    getCaseStudyBySlug: b.query({
      query: (slug) => `/case-studies/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "CaseStudies", id: `slug-${slug}` }],
    }),

    // ---- Admin "edit by slug" convenience hook ----
    // The backend has no admin-scoped "get by slug" route, so this resolves
    // slug -> _id via the raw list (?status omitted = all statuses), then
    // fetches the full document via GET /:id. No backend change required.
   


    getCaseStudyBySlugAdmin: b.query({
      query: (slug) => ({
        url: `/case-studies/slug/${slug}`,
      }),

      providesTags: (result, error, slug) => [
        { type: "CaseStudies", id: `slug-${slug}` },
      ],
    }),

    // POST /api/case-studies  (multipart/form-data)
    // `body` MUST be a FormData instance — see buildCaseStudyFormData().
    createCaseStudy: b.mutation({
      query: (formData) => ({ url: "/case-studies", method: "POST", body: formData }),
      invalidatesTags: [{ type: "CaseStudies", id: "LIST" }],
    }),

    // PUT /api/case-studies/:id  (multipart/form-data)
    updateCaseStudy: b.mutation({
      query: ({ id, body }) => ({ url: `/case-studies/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CaseStudies", id },
        { type: "CaseStudies", id: "LIST" },
      ],
    }),

    // No PATCH /:slug/publish route exists on the backend.
    // Publishing is just a normal update of the `status` field.
    toggleCaseStudyPublish: b.mutation({
      query: ({ id, currentStatus }) => {
        const formData = new FormData();
        formData.append("status", currentStatus === "published" ? "draft" : "published");
        return { url: `/case-studies/${id}`, method: "PUT", body: formData };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "CaseStudies", id },
        { type: "CaseStudies", id: "LIST" },
      ],
    }),

    // DELETE /api/case-studies/:id
    deleteCaseStudy: b.mutation({
      query: (id) => ({ url: `/case-studies/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "CaseStudies", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCaseStudiesQuery,
  useGetCaseStudyByIdQuery,
  useGetCaseStudyBySlugQuery,
  useGetCaseStudyBySlugAdminQuery,
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useToggleCaseStudyPublishMutation,
  useDeleteCaseStudyMutation,
} = caseStudiesApi;
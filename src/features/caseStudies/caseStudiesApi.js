import { baseApi } from "../../app/baseApi";

export const caseStudiesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getCaseStudies: b.query({
      query: (p = {}) => ({
        url: "/case-studies",
        params: p
      }),
      providesTags: ["CaseStudies"]
    }),

    getCaseStudiesBySlug: b.query({
      query: (slug) => `/case-studies/${slug}`,
      providesTags: (result, error, slug) => [{ type: "CaseStudies", id: slug }],
    }),

    createCaseStudy: b.mutation({
      query: (body) => ({
        url: "/case-studies",
        method: "POST",
        body
      }),
      invalidatesTags: ["CaseStudies"]
    }),

    // ✅ CORRECTED: Explicitly destructure slug and body
    updateCaseStudy: b.mutation({
      query: ({ id, body }) => ({  // Changed from ({ id, ...body })
        url: `/case-studies/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: (result, error, { id }) => [
        "CaseStudies",
        { type: "CaseStudies", id: id }
      ]
    }),

    toggleCaseStudyPublish: b.mutation({
      query: (slug) => ({
        url: `/case-studies/${slug}/publish`,
        method: "PATCH"
      }),
      invalidatesTags: ["CaseStudies"]
    }),

    deleteCaseStudy: b.mutation({
      query: (slug) => ({
        url: `/case-studies/${slug}`,
        method: "DELETE"
      }),
      invalidatesTags: ["CaseStudies"]
    }),
  }),
});

export const {
  useGetCaseStudiesQuery,
  useGetCaseStudiesBySlugQuery,
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useToggleCaseStudyPublishMutation,
  useDeleteCaseStudyMutation
} = caseStudiesApi;
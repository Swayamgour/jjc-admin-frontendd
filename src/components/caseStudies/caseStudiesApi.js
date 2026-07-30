// Adjust this import to match your existing RTK Query base slice
// (the same one your other admin panel modules — Services, Platforms, etc. — inject into).
import { apiSlice } from "../../app/apiSlice";

export const caseStudiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Admin table — raw filtered list
    getCaseStudies: builder.query({
      query: (params = {}) => ({ url: "/case-studies", params }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map((c) => ({ type: "CaseStudy", id: c._id })), { type: "CaseStudy", id: "LIST" }]
          : [{ type: "CaseStudy", id: "LIST" }],
    }),

    // Admin edit form — by id
    getCaseStudyById: builder.query({
      query: (id) => `/case-studies/${id}`,
      providesTags: (result, error, id) => [{ type: "CaseStudy", id }],
    }),

    // Admin edit form — by slug (any status: draft or published), used by CaseStudyFormPage
    getCaseStudyBySlugAdmin: builder.query({
      query: (slug) => `/case-studies/admin/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "CaseStudy", id: slug }],
    }),

    // Public detail page — story + auto-computed related reports
    getCaseStudyBySlug: builder.query({
      query: (slug) => `/case-studies/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "CaseStudy", id: slug }],
    }),

    createCaseStudy: builder.mutation({
      query: (formData) => ({
        url: "/case-studies",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "CaseStudy", id: "LIST" }],
    }),

    updateCaseStudy: builder.mutation({
      query: ({ id, body }) => ({
        url: `/case-studies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CaseStudy", id },
        { type: "CaseStudy", id: "LIST" },
      ],
    }),

    deleteCaseStudy: builder.mutation({
      query: (id) => ({
        url: `/case-studies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CaseStudy", id: "LIST" }],
    }),

    toggleCaseStudyPublish: builder.mutation({
      query: (id) => ({
        url: `/case-studies/${id}/toggle-publish`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CaseStudy", id },
        { type: "CaseStudy", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCaseStudiesQuery,
  useGetCaseStudyByIdQuery,
  useGetCaseStudyBySlugAdminQuery,
  useGetCaseStudyBySlugQuery,
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useDeleteCaseStudyMutation,
  useToggleCaseStudyPublishMutation,
} = caseStudiesApi;

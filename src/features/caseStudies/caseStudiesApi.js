import { baseApi } from "../../app/baseApi";
export const caseStudiesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getCaseStudies: b.query({ query: (p = {}) => ({ url: "/case-studies", params: p }), providesTags: ["CaseStudies"] }),
    createCaseStudy: b.mutation({ query: (body) => ({ url: "/case-studies", method: "POST", body }), invalidatesTags: ["CaseStudies"] }),
    updateCaseStudy: b.mutation({ query: ({ slug, ...body }) => ({ url: `/case-studies/${slug}`, method: "PUT", body }), invalidatesTags: ["CaseStudies"] }),
    toggleCaseStudyPublish: b.mutation({ query: (slug) => ({ url: `/case-studies/${slug}/publish`, method: "PATCH" }), invalidatesTags: ["CaseStudies"] }),
    deleteCaseStudy: b.mutation({ query: (slug) => ({ url: `/case-studies/${slug}`, method: "DELETE" }), invalidatesTags: ["CaseStudies"] }),
  }),
});
export const { useGetCaseStudiesQuery, useCreateCaseStudyMutation, useUpdateCaseStudyMutation, useToggleCaseStudyPublishMutation, useDeleteCaseStudyMutation } = caseStudiesApi;

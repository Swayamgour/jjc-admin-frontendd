import { baseApi } from "../../app/baseApi";

export const caseStudyCategoriesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getCaseStudyCategories: b.query({
      query: (p = {}) => ({ url: "/case-study-categories", params: p }),
      providesTags: ["CaseStudyCategories"],
    }),
    createCaseStudyCategory: b.mutation({
      query: (body) => ({ url: "/case-study-categories", method: "POST", body }),
      invalidatesTags: ["CaseStudyCategories"],
    }),
    updateCaseStudyCategory: b.mutation({
      query: ({ id, ...body }) => ({ url: `/case-study-categories/${id}`, method: "PUT", body }),
      invalidatesTags: ["CaseStudyCategories"],
    }),
    deleteCaseStudyCategory: b.mutation({
      query: (id) => ({ url: `/case-study-categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["CaseStudyCategories"],
    }),
  }),
});

export const {
  useGetCaseStudyCategoriesQuery,
  useCreateCaseStudyCategoryMutation,
  useUpdateCaseStudyCategoryMutation,
  useDeleteCaseStudyCategoryMutation,
} = caseStudyCategoriesApi;

// Adjust this import to match your existing RTK Query base slice.
import { apiSlice } from "../../app/apiSlice";

export const caseStudyCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Admin table + wizard "Industry/Capability" dropdown
    getCaseStudyCategories: builder.query({
      query: (params = {}) => ({ url: "/case-study-categories", params }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map((c) => ({ type: "CaseStudyCategory", id: c._id })), { type: "CaseStudyCategory", id: "LIST" }]
          : [{ type: "CaseStudyCategory", id: "LIST" }],
    }),

    getCaseStudyCategoryById: builder.query({
      query: (id) => `/case-study-categories/${id}`,
      providesTags: (result, error, id) => [{ type: "CaseStudyCategory", id }],
    }),

    // Public — powers the full /success/industry-healthcare style listing page
    // (category hero/glance content + auto stats + published stories/gaps) in one call
    getCaseStudyCategoryPage: builder.query({
      query: ({ type, slug }) => `/case-study-categories/page/${type}/${slug}`,
      providesTags: (result, error, { type, slug }) => [{ type: "CaseStudyCategory", id: `${type}-${slug}` }],
    }),

    createCaseStudyCategory: builder.mutation({
      query: (body) => ({ url: "/case-study-categories", method: "POST", body }),
      invalidatesTags: [{ type: "CaseStudyCategory", id: "LIST" }],
    }),

    updateCaseStudyCategory: builder.mutation({
      query: ({ id, body }) => ({ url: `/case-study-categories/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CaseStudyCategory", id },
        { type: "CaseStudyCategory", id: "LIST" },
      ],
    }),

    deleteCaseStudyCategory: builder.mutation({
      query: (id) => ({ url: `/case-study-categories/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "CaseStudyCategory", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCaseStudyCategoriesQuery,
  useGetCaseStudyCategoryByIdQuery,
  useGetCaseStudyCategoryPageQuery,
  useCreateCaseStudyCategoryMutation,
  useUpdateCaseStudyCategoryMutation,
  useDeleteCaseStudyCategoryMutation,
} = caseStudyCategoriesApi;

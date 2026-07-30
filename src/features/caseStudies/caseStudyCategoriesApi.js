import { baseApi } from "../../app/baseApi";

export const caseStudyCategoriesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /api/case-study-categories?type=industry&status=published
    // Raw list — admin table + navbar "Browse by Industry/Capability" menus
    getCaseStudyCategories: b.query({
      query: (p = {}) => ({ url: "/case-study-categories", params: p }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((c) => ({ type: "CaseStudyCategories", id: c._id })),
              { type: "CaseStudyCategories", id: "LIST" },
            ]
          : [{ type: "CaseStudyCategories", id: "LIST" }],
    }),

    // GET /api/case-study-categories/:id
    // Single category — used by the admin edit form
    getCaseStudyCategoryById: b.query({
      query: (id) => `/case-study-categories/${id}`,
      providesTags: (result, error, id) => [{ type: "CaseStudyCategories", id }],
    }),

    // GET /api/case-study-categories/page/:type/:slug
    // Public full listing-page payload — { category, stats, caseStudies }
    // Powers SuccessIndustryHealthcare.jsx / SuccessCapability*.jsx
    getCaseStudyCategoryPage: b.query({
      query: ({ type, slug }) => `/case-study-categories/page/${type}/${slug}`,
      providesTags: (result, error, { type, slug }) => [
        { type: "CaseStudyCategoryPage", id: `${type}-${slug}` },
      ],
    }),

    createCaseStudyCategory: b.mutation({
      query: (body) => ({ url: "/case-study-categories", method: "POST", body }),
      invalidatesTags: [{ type: "CaseStudyCategories", id: "LIST" }],
    }),

    updateCaseStudyCategory: b.mutation({
      query: ({ id, ...body }) => ({ url: `/case-study-categories/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CaseStudyCategories", id },
        { type: "CaseStudyCategories", id: "LIST" },
      ],
    }),

    deleteCaseStudyCategory: b.mutation({
      query: (id) => ({ url: `/case-study-categories/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "CaseStudyCategories", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCaseStudyCategoriesQuery,
  useGetCaseStudyCategoryByIdQuery,
  useGetCaseStudyCategoryPageQuery,
  useCreateCaseStudyCategoryMutation,
  useUpdateCaseStudyCategoryMutation,
  useDeleteCaseStudyCategoryMutation,
} = caseStudyCategoriesApi;
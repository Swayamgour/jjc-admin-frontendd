import { baseApi } from "../../app/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),

    // Get single category by slug
    getCategory: builder.query({
      query: (slug) => `/categories/${slug}`,
      providesTags: (result, error, slug) => [
        { type: "Categories", id: slug },
      ],
    }),

    // Create category
    createCategory: builder.mutation({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Update category
    updateCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    // Add subcategory
    addSubcategory: builder.mutation({
      query: ({ categoryId, body }) => ({
        url: `/categories/${categoryId}/subcategories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Update subcategory
    updateSubcategory: builder.mutation({
      query: ({ categoryId, subId, body }) => ({
        url: `/categories/${categoryId}/subcategories/${subId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Delete subcategory
    deleteSubcategory: builder.mutation({
      query: ({ categoryId, subId }) => ({
        url: `/categories/${categoryId}/subcategories/${subId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = categoryApi;
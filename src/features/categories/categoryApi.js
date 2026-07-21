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

    getAllItemByCategory: builder.query({
      query: (slug) => `/categories/${slug}/items`,
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

    // Add item (level 3)
    addItem: builder.mutation({
      query: ({ categoryId, subId, body }) => ({
        url: `/categories/${categoryId}/subcategories/${subId}/items`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Update item (level 3)
    updateItem: builder.mutation({
      query: ({ categoryId, subId, itemId, body }) => ({
        url: `/categories/${categoryId}/subcategories/${subId}/items/${itemId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Delete item (level 3)
    deleteItem: builder.mutation({
      query: ({ categoryId, subId, itemId }) => ({
        url: `/categories/${categoryId}/subcategories/${subId}/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllItemByCategoryQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = categoryApi;
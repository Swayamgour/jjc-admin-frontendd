import { baseApi } from "../../app/baseApi";

export const blogCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all blog categories
    getBlogCategories: builder.query({
      query: () => "/blog-categories",
      providesTags: ["BlogCategories"],
    }),

    // Get single blog category
    getBlogCategory: builder.query({
      query: (id) => `/blog-categories/${id}`,
      providesTags: (result, error, id) => [
        { type: "BlogCategories", id },
      ],
    }),

    // Create blog category
    createBlogCategory: builder.mutation({
      query: (body) => ({
        url: "/blog-categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BlogCategories"],
    }),

    // Update blog category
    
    updateBlogCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/blog-categories/${id}`,
        method: "PATCH",
        body,
      }),
    }),

    // Delete blog category
    deleteBlogCategory: builder.mutation({
      query: (id) => ({
        url: `/blog-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BlogCategories"],
    }),
  }),
});

export const {
  useGetBlogCategoriesQuery,
  useGetBlogCategoryQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
} = blogCategoryApi;
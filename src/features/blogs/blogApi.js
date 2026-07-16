import { baseApi } from "../../app/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getBlogs: builder.query({
      query: () => "/blog",
      providesTags: ["Blogs"],
    }),

    getBlog: builder.query({
      query: (id) => `/blog/id/${id}`,
      providesTags: ["Blogs"],
    }),

    createBlog: builder.mutation({
      query: (body) => ({
        url: "/blog",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blogs"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, body }) => ({
        url: `/blog/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),

    toggleBlogStatus: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Blogs"],
    }),

  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useToggleBlogStatusMutation,
} = blogApi;
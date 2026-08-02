import { baseApi } from "../../app/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /api/blog?all=true — admin list (includes drafts)
    getBlogs: b.query({
      query: (p = {}) => ({ url: "/blog", params: { limit: 100, all: true, ...p } }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map((p) => ({ type: "Blogs", id: p._id })), { type: "Blogs", id: "LIST" }]
          : [{ type: "Blogs", id: "LIST" }],
    }),

    // GET /api/blog/filters
    getBlogFilters: b.query({
      query: () => "/blog/filters",
      providesTags: [{ type: "Blogs", id: "FILTERS" }],
    }),

    // GET /api/blog/id/:id — admin edit form (protected, includes drafts)
    getBlogById: b.query({
      query: (id) => `/blog/id/${id}`,
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    // POST /api/blog
    createBlog: b.mutation({
      query: (body) => ({ url: "/blog", method: "POST", body }),
      invalidatesTags: [{ type: "Blogs", id: "LIST" }],
    }),

    // PUT /api/blog/:id
    updateBlog: b.mutation({
      query: ({ id, ...body }) => ({ url: `/blog/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Blogs", id },
        { type: "Blogs", id: "LIST" },
      ],
    }),

    // DELETE /api/blog/:id
    deleteBlog: b.mutation({
      query: (id) => ({ url: `/blog/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Blogs", id: "LIST" }],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogFiltersQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;

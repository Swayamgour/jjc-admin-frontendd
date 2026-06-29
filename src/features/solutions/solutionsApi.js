import { baseApi } from "../../app/baseApi";
export const solutionsApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getSolutions: b.query({ query: (p={}) => ({ url: "/solutions", params: p }), providesTags: ["Solutions"] }),
    createSolution: b.mutation({ query: (body) => ({ url: "/solutions", method: "POST", body }), invalidatesTags: ["Solutions"] }),
    updateSolution: b.mutation({ query: ({ slug, ...body }) => ({ url: `/solutions/${slug}`, method: "PUT", body }), invalidatesTags: ["Solutions"] }),
    toggleSolutionPublish: b.mutation({ query: (slug) => ({ url: `/solutions/${slug}/publish`, method: "PATCH" }), invalidatesTags: ["Solutions"] }),
    deleteSolution: b.mutation({ query: (slug) => ({ url: `/solutions/${slug}`, method: "DELETE" }), invalidatesTags: ["Solutions"] }),
  }),
});
export const { useGetSolutionsQuery, useCreateSolutionMutation, useUpdateSolutionMutation, useToggleSolutionPublishMutation, useDeleteSolutionMutation } = solutionsApi;

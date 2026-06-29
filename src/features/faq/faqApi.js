import { baseApi } from "../../app/baseApi";
export const faqApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getFAQs: b.query({ query: (p={}) => ({ url: "/faqs", params: p }), providesTags: ["FAQs"] }),
    createFAQ: b.mutation({ query: (body) => ({ url: "/faqs", method: "POST", body }), invalidatesTags: ["FAQs"] }),
    updateFAQ: b.mutation({ query: ({ id, ...body }) => ({ url: `/faqs/${id}`, method: "PUT", body }), invalidatesTags: ["FAQs"] }),
    deleteFAQ: b.mutation({ query: (id) => ({ url: `/faqs/${id}`, method: "DELETE" }), invalidatesTags: ["FAQs"] }),
  }),
});
export const { useGetFAQsQuery, useCreateFAQMutation, useUpdateFAQMutation, useDeleteFAQMutation } = faqApi;

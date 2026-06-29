import { baseApi } from "../../app/baseApi";
export const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getTestimonials: b.query({ query: () => "/testimonials", providesTags: ["Testimonials"] }),
    createTestimonial: b.mutation({ query: (body) => ({ url: "/testimonials", method: "POST", body }), invalidatesTags: ["Testimonials"] }),
    updateTestimonial: b.mutation({ query: ({ id, ...body }) => ({ url: `/testimonials/${id}`, method: "PUT", body }), invalidatesTags: ["Testimonials"] }),
    deleteTestimonial: b.mutation({ query: (id) => ({ url: `/testimonials/${id}`, method: "DELETE" }), invalidatesTags: ["Testimonials"] }),
  }),
});
export const { useGetTestimonialsQuery, useCreateTestimonialMutation, useUpdateTestimonialMutation, useDeleteTestimonialMutation } = testimonialsApi;

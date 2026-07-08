import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jjc-backend-new-two.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "Services", "Platforms", "Solutions", "Industries",
    "Resources", "CaseStudies", "Leads", "FAQs", "Testimonials",
    "Stats", "Nav",
  ],
  endpoints: () => ({}),
});

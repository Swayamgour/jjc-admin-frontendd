import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://jjc-backend-new-two.onrender.com/api",
    baseUrl: "https://jjc.admin.amaxjobs.com/api",
    // baseUrl: "http://localhost:5008/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "Services", "Platforms", "Solutions", "Industries",
    "Resources", "CaseStudies", "CaseStudyCategories", "Leads", "FAQs", "Testimonials",
    "Stats", "Nav", "HomeHero", "HomeSections",
  ],
  endpoints: () => ({}),
});

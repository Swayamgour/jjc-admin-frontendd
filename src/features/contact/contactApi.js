import { baseApi } from "../../app/baseApi";
export const contactApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getLeads: b.query({ query: (p={}) => ({ url: "/contact/leads", params: p }), providesTags: ["Leads"] }),
    getLeadStats: b.query({ query: () => "/contact/stats", providesTags: ["Stats"] }),
    updateLeadStatus: b.mutation({ query: ({ id, ...body }) => ({ url: `/contact/leads/${id}/status`, method: "PATCH", body }), invalidatesTags: ["Leads", "Stats"] }),
  }),
});
export const { useGetLeadsQuery, useGetLeadStatsQuery, useUpdateLeadStatusMutation } = contactApi;

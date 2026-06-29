import { baseApi } from "../../app/baseApi";
export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (b) => ({
        getDashboardReport: b.query({ query: (p = {}) => ({ url: "/dashboard/stats", params: p }), providesTags: ["Solutions"] }),
        
    }),
});
export const { useGetDashboardReportQuery } = dashboardApi;

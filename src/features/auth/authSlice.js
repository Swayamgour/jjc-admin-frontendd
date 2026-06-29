import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../../app/baseApi";

// RTK Query endpoints for auth
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query({
      query: () => "/auth/me",
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;

// Load persisted auth from localStorage
const token = localStorage.getItem("jjc_token");
const user = localStorage.getItem("jjc_user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!token,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem("jjc_token", token);
      localStorage.setItem("jjc_user", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jjc_token");
      localStorage.removeItem("jjc_user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

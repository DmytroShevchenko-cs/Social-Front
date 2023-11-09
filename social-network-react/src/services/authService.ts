import { api } from "../api/api";

import { ILoginData } from "../types/User";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: ILoginData) => ({
        body: data,
        url: "/api/User/login",
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const checkAuth = (): boolean => {
  return localStorage.getItem("accessKey") ? true : false;
};

export const { useLoginMutation } = authApi;

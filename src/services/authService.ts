import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo"

import { ILoginData, IUserRegisterData } from "../types/User";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: ILoginData) => ({
        body: data,
        url: "/api/Auth/login",
        method: HttpMethodType.POST,
        responseHandler: (response) => response.json(),
      }),
    }),
    userRegister: builder.mutation({
      query: (data: IUserRegisterData) => ({
        body: data,
        url: "/api/User",
        method: HttpMethodType.POST
      })
    })
  }),
});

export const { useLoginMutation, useUserRegisterMutation } = authApi;

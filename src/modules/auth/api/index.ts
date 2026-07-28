import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "@/modules/shared/api/base-query";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginDto } from "./dtos/login.dto";
import { LoginResponseDto } from "./dtos/login-response.dto";
import { UserDto } from "./dtos/user.dto";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginDto>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<void, CreateUserDto>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
    }),
    getCurrentUser: builder.query<UserDto, void>({
      query: () => "/user/",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
} = authApi;

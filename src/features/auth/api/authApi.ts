// api/authApi.ts

import apiClient from "@/infrastructure/api/apiClient";
import type { LoginRequest } from "@/features/auth/api/auth.types";

// const apiBaseUrl = "/";

const API_ENDPOINTS = {
  LOGIN: "token",
  ME:"me",
  REGISTER: "register",
  VERIFY_MFA: "verify-mfa",
  LOGOUT: "/api/Account/Logout",
  FORGOT_PASSWORD: "/api/Account/ForgotPassword",
  RESET_PASSWORD: "reset-password",
};



export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

const authService = {
  login: (data: LoginRequest) => {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", data.username);
    formData.append("password", data.password);

    return apiClient.post(API_ENDPOINTS.LOGIN, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

  register: (data: any) => {
    return apiClient.post(API_ENDPOINTS.REGISTER, data);
  },

  verifyMfa: (data: { username: string; password: string; otp: string }) => {
    const formData = new URLSearchParams();

    formData.append("grant_type", "password");
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("otp", data.otp);
    formData.append("otp_provider", "EmailCode");

    return apiClient.post("token", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },





  logout: () => {
    return apiClient.post(API_ENDPOINTS.LOGOUT);
  },

requestPasswordReset: (identifier: string) => {
  const formData = new URLSearchParams();
  formData.append("Username", identifier);

  return apiClient.post(
    API_ENDPOINTS.FORGOT_PASSWORD,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
},

  resetPassword: (data: ResetPasswordRequest) => {
    return apiClient.post(API_ENDPOINTS.RESET_PASSWORD, data);
  },

  getMe: () => {
    return apiClient.get(API_ENDPOINTS.ME);
  },
};

export default authService;
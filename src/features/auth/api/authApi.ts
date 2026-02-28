// api/authApi.ts

import apiClient from "@/infrastructure/api/apiClient";
import type { LoginRequest } from "@/features/auth/api/auth.types";

// const apiBaseUrl = "/";

const API_ENDPOINTS = {
  LOGIN: "token",
  REGISTER: "register",
  VERIFY_MFA: "verify-mfa",
  LOGOUT: "logout",
  FORGOT_PASSWORD: "forgot-password",
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

  register: (data: RegisterRequest) => {
    return apiClient.post(API_ENDPOINTS.REGISTER, data);
  },

  verifyMfa: (otp: string) => {
    return apiClient.post(API_ENDPOINTS.VERIFY_MFA, { otp });
  },

  logout: () => {
    return apiClient.post(API_ENDPOINTS.LOGOUT);
  },

  requestPasswordReset: (identifier: string) => {
    return apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { identifier });
  },

  resetPassword: (data: ResetPasswordRequest) => {
    return apiClient.post(API_ENDPOINTS.RESET_PASSWORD, data);
  },
};

export default authService;
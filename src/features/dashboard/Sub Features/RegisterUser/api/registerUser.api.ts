
import apiClient from "@/infrastructure/api/apiClient";
import { type RegisterUserForm } from "@/features/dashboard/Sub Features/RegisterUser/validation/registerUser.schema";

const BASE = "api/Account/";

export const registerUserApi = async (data: RegisterUserForm) => {

  const response = await apiClient.post(`${BASE}/ForgotPassword`, data);

  return response.data;

};

export const getUsersApi = async () => {
  const res = await apiClient(`${BASE}GetUserList`);
  return res.data;
};

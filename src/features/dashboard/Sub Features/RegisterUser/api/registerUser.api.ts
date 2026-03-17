
import apiClient from "@/infrastructure/api/apiClient";
import { type RegisterUserForm } from "@/features/dashboard/Sub Features/RegisterUser/validation/registerUser.schema";

const BASE = "api/Account/";



export const getUsersApi = async () => {
  const res = await apiClient(`${BASE}GetUserList`);
  return res.data;
};


export const registerUserApi = async (data: RegisterUserForm) => {

  const payload = {
    Name: data.name,
    Email: data.email,
    PhoneNumber: data.phone,
    UserName: data.username,
    UserCode: data.usercode,
    Password: data.password,
    ConfirmPassword: data.confirmPassword
  };

  const response = await apiClient.post(`${BASE}Register`, payload);

  return response.data;
};
import { registerUserApi, getUsersApi } from "@/features/dashboard/Sub Features/RegisterUser/api/registerUser.api";
import { type RegisterUserForm } from "@/features/dashboard/Sub Features/RegisterUser/validation/registerUser.schema";
import type { AxiosError } from "axios";

export const registerUserService = async (data: RegisterUserForm) => {

  try {

    const response = await registerUserApi(data);

    return {
      success: response?.IsSuccessful ?? true,
      data: response
    };

  } catch (error: unknown) {

    if ((error as AxiosError)?.isAxiosError) {
      const err = error as AxiosError<any>;

      return {
        success: false,
        message: err.response?.data?.Message || "User registration failed"
      };
    }

    return {
      success: false,
      message: "Unexpected error occurred"
    };
  }

};

export const getUsersService = async () => {
  try {
    const res = await getUsersApi();

    return {
      success: true,
      data: res.Data
    };

  } catch (error) {

    return {
      success: false,
      data: []
    };

  }
};
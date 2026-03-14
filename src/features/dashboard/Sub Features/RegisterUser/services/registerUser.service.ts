import { registerUserApi,getUsersApi } from "@/features/dashboard/Sub Features/RegisterUser/api/registerUser.api";
import {type RegisterUserForm } from "@/features/dashboard/Sub Features/RegisterUser/validation/registerUser.schema";

export const registerUserService = async (data: RegisterUserForm) => {

  try {

    const response = await registerUserApi(data);

    return {
      success: true,
      data: response
    };

  } catch (error) {

    return {
      success: false,
      message: "User registration failed"
    };

  }

};

export const getUserService = async () => {

  try {

    const response = await getUsersApi();

    return {
      success: true,
      data: response
    };

  } catch (error) {

    return {
      success: false,
      message: "User registration failed"
    };

  }

};
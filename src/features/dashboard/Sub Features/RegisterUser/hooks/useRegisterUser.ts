import { useState } from "react";
import { registerUserService } from "@/features/dashboard/Sub Features/RegisterUser/services/registerUser.service";
import {type RegisterUserForm } from "@/features/dashboard/Sub Features/RegisterUser/validation/registerUser.schema";

export const useRegisterUser = () => {

  const [loading, setLoading] = useState(false);

  const registerUser = async (data: RegisterUserForm) => {

    setLoading(true);

    const result = await registerUserService(data);

    setLoading(false);

    return result;
  };

  return {
    registerUser,
    loading
  };

};
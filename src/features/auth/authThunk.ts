import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@/features/auth/api/authApi';
import type { AxiosError } from "axios";
import type { LoginRequest, RegisterRequest, RequestPasswordResetRequest, ResetPasswordRequest } from '@/features/auth/api/auth.types';



// export const loginAsync = createAsyncThunk<
//   LoginResponse,        // ✅ Return type (what fulfilled returns)
//   LoginRequest,         // ✅ Argument type (what you dispatch with)
//   { rejectValue: string } // ✅ Error type
// >(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await authService.login(credentials);
//       return response.data;
//     }catch (error) {
//       const err = error as AxiosError<any>;
//       return rejectWithValue(
//         err.response?.data?.error_description || "Login failed"
//       );
//     }
//   }
// );

// export const loginAsync = createAsyncThunk<
//   any,
//   LoginRequest,
//   { rejectValue: { type: string; message?: string } }
// >(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       await authService.login(credentials);
//       return;
//     } catch (error) {
//       const err = error as AxiosError<any>;
//       const apiError = err.response?.data;

//       if (apiError?.error === "mfa_required") {
//         return rejectWithValue({ type: "MFA_REQUIRED" });
//       }

//       return rejectWithValue({
//         type: "GENERIC",
//         message:
//           apiError?.error_description || "Login failed",
//       });
//     }
//   }
// );

export const loginAsync = createAsyncThunk<
  any,
  LoginRequest,
  { rejectValue: { type: string; message?: string } }
>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      return response.data;   // ✅ VERY IMPORTANT

    } catch (error) {
      const err = error as AxiosError<any>;
      const apiError = err.response?.data;

      if (apiError?.error === "mfa_required") {
        return rejectWithValue({ type: "MFA_REQUIRED" });
      }

      return rejectWithValue({
        type: "GENERIC",
        message: apiError?.error_description || "Login failed",
      });
    }
  }
);

export const restoreSessionAsync = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getMe();
      return response.data;
    } catch (error) {
      return rejectWithValue("Not authenticated");
    }
  }
);

export const registerAsync = createAsyncThunk<
  any, // change to proper response type if you have one
  RegisterRequest,
  { rejectValue: string }
>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Registration failed");
    }
  }
);



export const verifyMfaAsync = createAsyncThunk<
  any, // replace with proper LoginResponse type later
  { username: string; password: string; otp: string },
  { rejectValue: string }
>(
  "auth/verifyMfa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.verifyMfa(data);
      return response.data; // ✅ RETURN DATA
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error_description || "OTP verification failed"
      );
    }
  }
);

export const logoutAsync = createAsyncThunk<
  { success: boolean },
  void,
  { rejectValue: string }
>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return { success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Logout failed");
    }
  }
);

// export const requestPasswordResetAsync = createAsyncThunk(
//   'auth/requestPasswordReset',
//   async (identifier, { rejectWithValue }) => {
//     try {
//       const response = await authService.requestPasswordReset(identifier);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const requestPasswordResetAsync = createAsyncThunk<
  string,
  RequestPasswordResetRequest,
  { rejectValue: string }
>(
  "auth/requestPasswordReset",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.requestPasswordReset(
        payload.identifier
      );


      if (!response.data?.IsSuccessful) {
        return rejectWithValue(response.data?.Message || "Request failed");
      }

      return response.data.Message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.Message || "Server error"
      );
    }
  }
);

export const resetPasswordAsync = createAsyncThunk<
  void,
  ResetPasswordRequest,
  { rejectValue: string }
>(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      await authService.resetPassword(data);  //  FIXED
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Password reset failed");
    }
  }
);
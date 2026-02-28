import { createAsyncThunk } from '@reduxjs/toolkit';
import authService, { type LoginRequest } from '@/features/auth/api/authApi';
import type { AxiosError } from "axios";
import type { LoginResponse } from '@/features/auth/api/auth.types';



export const loginAsync = createAsyncThunk<
  LoginResponse,        // ✅ Return type (what fulfilled returns)
  LoginRequest,         // ✅ Argument type (what you dispatch with)
  { rejectValue: string } // ✅ Error type
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response.data;
    }catch (error) {
      const err = error as AxiosError<any>;
      return rejectWithValue(
        err.response?.data?.error_description || "Login failed"
      );
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyMfaAsync = createAsyncThunk(
  'auth/verifyMfa',
  async (otp, { rejectWithValue }) => {
    try {
      await authService.verifyMfa(otp);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestPasswordResetAsync = createAsyncThunk(
  'auth/requestPasswordReset',
  async (identifier, { rejectWithValue }) => {
    try {
      const response = await authService.requestPasswordReset(identifier);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(email, newPassword);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

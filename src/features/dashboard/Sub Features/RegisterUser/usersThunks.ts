import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersService } from "@/features/dashboard/Sub Features/RegisterUser/services/registerUser.service";
import type { AxiosError } from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {

      const response = await getUsersService();

      if (!response.success) {
        return rejectWithValue("Failed to fetch users");
      }

      return response.data;

    } catch (error) {

      const err = error as AxiosError<any>;

      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );

    }
  }
);
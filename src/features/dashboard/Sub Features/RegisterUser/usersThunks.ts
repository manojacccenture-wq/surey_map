import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersService } from "@/features/dashboard/Sub Features/RegisterUser/services/registerUser.service";

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

      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch users"
      );

    }
  }
);
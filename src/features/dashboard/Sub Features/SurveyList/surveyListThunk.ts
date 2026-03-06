import { createAsyncThunk } from "@reduxjs/toolkit";
import surveyListApi from "./api/surveyListApi";

export const fetchSurveyList = createAsyncThunk(
  "surveyList/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await surveyListApi.getSurveyFormData();

      return response.data?.Data || [];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.Message || "Failed to load survey list"
      );
    }
  }
);
import { createSlice } from "@reduxjs/toolkit";
import { fetchSurveyList } from "./surveyListThunk";

interface SurveyListState {
  loading: boolean;
  error: string | null;
  data: any[];
}

const initialState: SurveyListState = {
  loading: false,
  error: null,
  data: [],
};

const surveyListSlice = createSlice({
  name: "surveyList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSurveyList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchSurveyList.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default surveyListSlice.reducer;
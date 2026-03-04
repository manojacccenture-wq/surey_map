import { createSlice } from "@reduxjs/toolkit";
import { fetchOverviewData } from "@/features/dashboard/Sub Features/Overview/overviewThunk";

interface OverviewState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: OverviewState = {
  loading: false,
  error: null,
  data: [],  // ✅ NEVER use null for arrays
};

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverviewData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOverviewData.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default overviewSlice.reducer;
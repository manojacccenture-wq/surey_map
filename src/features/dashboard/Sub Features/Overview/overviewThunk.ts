import { createAsyncThunk } from "@reduxjs/toolkit";
import overviewApi from "@/features/dashboard/Sub Features/Overview/api/overViewApi";

export const fetchOverviewData = createAsyncThunk(
  "overview/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const [
        totalSurvey,
        totalUsers,
        todaySurvey,
        surveyByUsers,
        depotWise,
        serviceAreaWise,
        thanaWise,
        clusterWise,
      ] = await Promise.all([
        overviewApi.getTotalSurveyCount(),
        overviewApi.getTotalUserCount(),
        overviewApi.getTotalSurveyCountByDate(
          new Date().toISOString().split("T")[0]
        ),
        overviewApi.getSurveyCountByUsers(),
        overviewApi.getDepotWiseCount(),
        overviewApi.getServiceAreaWiseCount(),
        overviewApi.getThanaWiseCount(),
        overviewApi.getClusterWiseCount(),
      ]);

      return {
        totalSurvey: totalSurvey.data,
        totalUsers: totalUsers.data,
        todaySurvey: todaySurvey.data,
        surveyByUsers: surveyByUsers.data,
        depotWise: depotWise.data,
        serviceAreaWise: serviceAreaWise.data,
        thanaWise: thanaWise.data,
        clusterWise: clusterWise.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.Message || "Failed to load dashboard data"
      );
    }
  }
);
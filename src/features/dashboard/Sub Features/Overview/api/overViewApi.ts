import apiClient from "@/infrastructure/api/apiClient";

const BASE = "/api/Survey";

const overviewApi = {
  getTotalSurveyCount: () =>
    apiClient.get(`${BASE}/GetTotalSurveyCount`),

  getTotalUserCount: () =>
    apiClient.get(`${BASE}/GetTotalUserCount`),

  getTotalSurveyCountByDate: (date: string) =>
    apiClient.get(`${BASE}/GetTotalSurveyCountByDate`, {
      params: { createdDate: date },
    }),

  getSurveyCountByUsers: () =>
    apiClient.get(`${BASE}/GetSurveyCountByUsers`),

  getDepotWiseCount: () =>
    apiClient.get(`${BASE}/GetDepotWiseCount`),

  getServiceAreaWiseCount: () =>
    apiClient.get(`${BASE}/GetServiceAreaWiseCount`),

  getThanaWiseCount: () =>
    apiClient.get(`${BASE}/GetThanaWiseCount`),

  getClusterWiseCount: () =>
    apiClient.get(`${BASE}/GetClusterWiseCount`),
};

export default overviewApi;
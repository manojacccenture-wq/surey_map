import apiClient from "@/infrastructure/api/apiClient";

const BASE = "/SurveyController";

const surveyListApi = {
  getSurveyFormData: () =>
    apiClient.get(`${BASE}/GetSurveyFormData`),
};

export default surveyListApi;
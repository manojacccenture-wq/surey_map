import total_user from "@/assets/Images/Page_Image/Dashboard/User/Total_User.png";

export const overviewAdapter = (apiData: any) => {
  if (!apiData) {
    return {
      cards: [],
      tableData: [],
    };
  }

  const cards = [
    {
      label: "Completed",
      value: apiData.totalSurvey?.Data ?? 0,
      valueColor: "#6100FF",
      iconBg: "#6100FF",
      icon: total_user,
    },

    {
      label: "Survey Users",
      value: apiData.totalUsers?.Data ?? 0,
      valueColor: "#2ECC71",
      iconBg: "#2ECC71",
      icon: total_user,
    },

    {
      label: "Surveys Today",
      value: apiData.todaySurvey?.Data ?? 0,
      valueColor: "#FFA800",
      iconBg: "#FFA800",
      icon: total_user,
    },

    {
      label: "Service Area",
      iconBg: "#2edede",
      icon: total_user,
      items:
        apiData.serviceAreaWise?.Data?.map((item: any) => ({
          name: item.Name,
          count: item.TotalSurveyCount,
        })) ?? [],
    },

    {
      label: "Depot",
      iconBg: "#a32ede",
      icon: total_user,
      items:
        apiData.depotWise?.Data?.map((item: any) => ({
          name: item.Name,
          count: item.TotalSurveyCount,
        })) ?? [],
    },

    {
      label: "Cluster",
      iconBg: "#2e31de",
      icon: total_user,
      items:
        apiData.clusterWise?.Data?.map((item: any) => ({
          name: item.Name,
          count: item.TotalSurveyCount,
        })) ?? [],
    },

    {
      label: "Thana",
      iconBg: "#2ec9de",
      icon: total_user,
      items:
        apiData.thanaWise?.Data?.map((item: any) => ({
          name: item.Name,
          count: item.TotalSurveyCount,
        })) ?? [],
    },
  ];

  /*
  ============================
  TABLE DATA ADAPTER
  ============================
  */

  const tableData =
    apiData.surveyByUsers?.Data?.map((item: any, index: number) => ({
      id: index + 1,
      name: item.Name,
      userName: item.UserName,
      surveyCount: item.TotalSurveyCount,
      createdAt: new Date().toISOString(), // fallback
    })) ?? [];

  return {
    cards,
    tableData,
  };
};
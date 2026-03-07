import total_user from "@/assets/Images/Page_Image/Dashboard/User/Total_User.png";

interface SummaryItem {
  name: string;
  count: number;
}

interface SummaryCard {
  label: string;
  value?: number | string;
  valueColor?: string;
  iconBg?: string;
  icon?: string;
  items?: SummaryItem[];
}

export interface SurveyRow {
  id: number;
  name: string;
  userName: string;
  surveyCount: number;
  createdAt: string;
}

interface OverviewAdapterResult {
  cards: SummaryCard[];
  tableData: SurveyRow[];
}

export const overviewAdapter = (apiData: any): OverviewAdapterResult => {
  if (!apiData) {
    return {
      cards: [],
      tableData: [],
    };
  }

  const cards: SummaryCard[] = [
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

    // Service Area
    {
      label: "Service Area",
      iconBg: "#2edede",
      icon: total_user,
      items:
        apiData.serviceAreaWise?.Data?.map((item: any) => ({
          name: item.ServiceArea ?? item.Name,
          count: item.TotalHouses ?? item.TotalSurveyCount,
        })) ?? [],
    },

    // Depot
    {
      label: "Depot",
      iconBg: "#a32ede",
      icon: total_user,
      items:
        apiData.depotWise?.Data?.map((item: any) => ({
          name: item.Depo ?? item.Name,
          count: item.TotalHouses ?? item.TotalSurveyCount,
        })) ?? [],
    },

    // Cluster
    {
      label: "Cluster",
      iconBg: "#2e31de",
      icon: total_user,
      items:
        apiData.clusterWise?.Data?.map((item: any) => ({
          name: item.Cluster ?? item.Name,
          count: item.TotalHouses ?? item.TotalSurveyCount,
        })) ?? [],
    },

    // Thana
    {
      label: "Thana",
      iconBg: "#2ec9de",
      icon: total_user,
      items:
        apiData.thanaWise?.Data?.map((item: any) => ({
          name: item.Thana ?? item.Name,
          count: item.TotalHouses ?? item.TotalSurveyCount,
        })) ?? [],
    },
  ];

  const tableData: SurveyRow[] =
    apiData.surveyByUsers?.Data?.map((item: any, index: number) => ({
      id: index + 1,
      name: item.Name,
      userName: item.UserName,
      surveyCount: item.TotalSurveyCount,
      createdAt: new Date().toISOString(),
    })) ?? [];

  return {
    cards,
    tableData,
  };
};
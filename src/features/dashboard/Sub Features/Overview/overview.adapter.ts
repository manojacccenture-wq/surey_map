import checked from "@/assets/Images/Page_Image/Dashboard/User/checked.png";
import survey from "@/assets/Images/Page_Image/Dashboard/User/survey.png";
import support from "@/assets/Images/Page_Image/Dashboard/User/support.png";
import surveyor from "@/assets/Images/Page_Image/Dashboard/User/surveyor.png";
import warehouse from "@/assets/Images/Page_Image/Dashboard/User/warehouse.png";
import networking from "@/assets/Images/Page_Image/Dashboard/User/networking.png";
import policeStation from "@/assets/Images/Page_Image/Dashboard/User/police-station.png";

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
      iconBg: "#EDEADE",
      icon: checked,
    },
    {
      label: "Survey Users",
      value: apiData.totalUsers?.Data ?? 0,
      valueColor: "#2ECC71",
      iconBg: "#EDEADE",
      icon: surveyor,
    },
    {
      label: "Surveys Today",
      value: apiData.todaySurvey?.Data ?? 0,
      valueColor: "#FFA800",
      iconBg: "#EDEADE",
      icon: survey,
    },

    // Service Area
    {
      label: "Service Area",
      iconBg: "#EDEADE",
      icon: support,
      items:
        apiData.serviceAreaWise?.Data?.map((item: any) => ({
          name: item.ServiceArea ?? item.Name,
          count: item.TotalHouses ?? item.TotalSurveyCount,
        })) ?? [],
    },

    // Depot
    {
      label: "Depot",
      iconBg: "#EDEADE",
      icon: warehouse,
      items:
        apiData.depotWise?.Data?.map((item: any) => ({
          name: item.Depo ?? item.Name,
          count: item.TotalHouses ?? item.TotalSurveyCount,
        })) ?? [],
    },

    // Cluster
    {
      label: "Cluster",
      iconBg: "#EDEADE",
      icon: networking,
      items:
        apiData.clusterWise?.Data?.map((item: any) => ({
          name: item.Cluster ?? item.Name,
          count: item.TotalHouses ?? item.TotalSurveyCount,
        })) ?? [],
    },

    // Thana
    {
      label: "Thana",
      iconBg: "#EDEADE",
      icon: policeStation,
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
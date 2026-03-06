export interface SurveyRow {
  id: number;
  serialNo: number;
  bpno: string;
  name: string;
  mobile: string;
  thana: string;
  vehicle: string;
  isActive: string;
  createdDate: string;
  latitude: string;
  longitude: string;
  address: string;
  deptName: string;
  serviceArea: string;
  cluster: string;
}

export const surveyListAdapter = (apiData: any[]): SurveyRow[] => {
  if (!Array.isArray(apiData)) return [];

  return apiData.map((item, index) => ({
     id: index + 1,
    serialNo: index + 1,
    bpno: item.BPNO,
    name: item.Name,
    mobile: item.Mobile,
    thana: item.Thana,
    vehicle: item.Vehicle,
    isActive: item.IsActive ? "Yes" : "No",
    createdDate: item.CreatedDate,
    latitude: item.Latitude,
    longitude: item.Longitude,
    address: item.Address,
    deptName: item.DeptName,
    serviceArea: item.ServiceArea,
    cluster: item.Cluster,
  }));
};
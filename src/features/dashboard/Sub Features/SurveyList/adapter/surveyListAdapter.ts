export interface SurveyRow {
  id: number;
  serialNo: number;

  Id: number;
  Name: string;
  MobileNo: string;
  Thana: string;
  RoadType: string;
  VehicleCanRun: string;
  HouseType: string;

  SurveyFloorMappingId: number | null;
  ImagePath: string | null;
  AttachmentId: number | null;

  Latitude: string;
  Longitude: string;

  CreatedBy: string | null;
  CreatedDate: string;

  UpdatedBy: string | null;
  UpdatedDate: string | null;

  IsActive: boolean;

  PersonDetailId: number | null;

  Address: string;

  BPNo: string | null;
  HasBPNo: boolean;

  UbdtLatitude: string | null;
  UbdtLongitude: string | null;

  Depo: string | null;
  ServiceArea: string | null;

  notAvailableReason: string | null;
  cluster: string | null;

  isNotAvailable: boolean | null;

  FloorSubtypeCount: number | null;

  SurveyBuildingMappings: any[];
}

export const surveyListAdapter = (apiData: any[]): SurveyRow[] => {
  if (!Array.isArray(apiData)) return [];

  return apiData.map((item, index) => ({
    id: item.Id ?? index + 1,
    serialNo: index + 1,

    Id: item.Id,
    Name: item.Name ?? "-",
    MobileNo: item.MobileNo ?? "-",
    Thana: item.Thana ?? "-",
    RoadType: item.RoadType ?? "-",
    VehicleCanRun: item.VehicleCanRun ?? "-",
    HouseType: item.HouseType ?? "-",

    SurveyFloorMappingId: item.SurveyFloorMappingId ?? null,
    ImagePath: item.ImagePath ?? null,
    AttachmentId: item.AttachmentId ?? null,

    Latitude: item.Latitude ?? "-",
    Longitude: item.Longitude ?? "-",

    CreatedBy: item.CreatedBy ?? null,
    CreatedDate: item.CreatedDate ?? "-",

    UpdatedBy: item.UpdatedBy ?? null,
    UpdatedDate: item.UpdatedDate ?? null,

    IsActive: item.IsActive ?? false,

    PersonDetailId: item.PersonDetailId ?? null,

    Address: item.Address ?? "-",

    BPNo: item.BPNo ?? null,
    HasBPNo: item.HasBPNo ?? false,

    UbdtLatitude: item.UbdtLatitude ?? null,
    UbdtLongitude: item.UbdtLongitude ?? null,

    Depo: item.Depo ?? null,
    ServiceArea: item.ServiceArea ?? null,

    notAvailableReason: item.notAvailableReason ?? null,
    cluster: item.cluster ?? null,

    isNotAvailable: item.isNotAvailable ?? null,

    FloorSubtypeCount: item.FloorSubtypeCount ?? null,

    SurveyBuildingMappings: item.SurveyBuildingMappings ?? [],
  }));
};
import { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridReadyEvent } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "@/shared/components/UI/Button/Button";
import Input from "@/shared/components/UI/Input/Input";


import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { fetchSurveyList } from "@/features/dashboard/Sub Features/SurveyList/surveyListThunk";
import { surveyListAdapter } from "@/features/dashboard/Sub Features/SurveyList/adapter/surveyListAdapter";


ModuleRegistry.registerModules([AllCommunityModule]);

const SurveyList = () => {
  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector(
    (state) => state.surveyList
  );

  useEffect(() => {
    dispatch(fetchSurveyList());
  }, [dispatch]);

  
  


  const gridRef = useRef<AgGridReact>(null);
  const [quickSearch, setQuickSearch] = useState("");

const columnDefs: ColDef[] = [
  { headerName: "Serial No", field: "serialNo", maxWidth: 110 },
  // { headerName: "Id", field: "Id" },

  { headerName: "BP No", field: "BPNo" },
  { headerName: "Name", field: "Name" },
  { headerName: "Mobile No", field: "MobileNo" },
  { headerName: "Thana", field: "Thana" },

  { headerName: "Road Type", field: "RoadType" },
  { headerName: "Vehicle Can Run", field: "VehicleCanRun" },
  { headerName: "House Type", field: "HouseType" },

  { headerName: "Survey Floor Mapping Id", field: "SurveyFloorMappingId" },
  { headerName: "Image Path", field: "ImagePath" },
  { headerName: "Attachment Id", field: "AttachmentId" },

  { headerName: "Latitude", field: "Latitude" },
  { headerName: "Longitude", field: "Longitude" },

  { headerName: "Created By", field: "CreatedBy" },
  { headerName: "Created Date", field: "CreatedDate" },

  // { headerName: "Updated By", field: "UpdatedBy" },
  // { headerName: "Updated Date", field: "UpdatedDate" },

  // { headerName: "Is Active", field: "IsActive" },

  // { headerName: "Person Detail Id", field: "PersonDetailId" },

  { headerName: "Address", field: "Address" },

  { headerName: "Has BP No", field: "HasBPNo" },

  { headerName: "UBDT Latitude", field: "UbdtLatitude" },
  { headerName: "UBDT Longitude", field: "UbdtLongitude" },

  { headerName: "Depo", field: "Depo" },
  { headerName: "Service Area", field: "ServiceArea" },

  { headerName: "Not Available Reason", field: "notAvailableReason" },

  { headerName: "Cluster", field: "cluster" },

  { headerName: "Is Not Available", field: "isNotAvailable" },

  { headerName: "Floor Subtype Count", field: "FloorSubtypeCount" },
];


const rowData = surveyListAdapter(data);



  const exportToCSV = () => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: "survey-data.csv",
    });
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg ">

        <h2 className="text-lg font-semibold text-gray-700">

        </h2>

        <div className="flex items-center gap-3">

          {/* Search */}
          <Input
            type="text"
            placeholder="Search survey..."
            value={quickSearch}
            onChange={(e) => {
              const value = e.target.value;

              setQuickSearch(value);

              gridRef.current?.api.setGridOption(
                "quickFilterText",
                value
              );
            }}
          // className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Export */}
          <Button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="ag-theme-alpine w-full h-[70vh] rounded-lg overflow-hidden p-2">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          loading={loading}
          onGridReady={onGridReady}
          pagination
          paginationPageSize={30}
          paginationPageSizeSelector={[10, 15, 30,50]}
          animateRows
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
            flex: 1,
            minWidth: 120,
          }}
        />

      </div>
    </div>
  );
};

export default SurveyList;
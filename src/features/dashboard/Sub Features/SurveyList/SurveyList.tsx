import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridReadyEvent } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const SurveyList = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [quickSearch, setQuickSearch] = useState("");

  const columnDefs: ColDef[] = [
    { headerName: "Serial No", field: "serialNo", maxWidth: 120 },
    { headerName: "BPNO", field: "bpno" },
    { headerName: "Name", field: "name" },
    { headerName: "Mobile", field: "mobile" },
    { headerName: "Thana", field: "thana" },
    { headerName: "Vehicle", field: "vehicle" },
    { headerName: "Is Active", field: "isActive" },
    {
      headerName: "Created Date",
      field: "createdDate",
      filter: "agDateColumnFilter",
    },
    { headerName: "Latitude", field: "latitude" },
    { headerName: "Longitude", field: "longitude" },
    { headerName: "Address", field: "address" },
    { headerName: "Dept Name", field: "deptName" },
    { headerName: "Service Area", field: "serviceArea" },
    { headerName: "Cluster", field: "cluster" },
  ];

  const rowData = [
    {
      serialNo: 1,
      bpno: "BP001",
      name: "Manoj",
      mobile: "9999999999",
      thana: "Bistupur",
      vehicle: "Bike",
      isActive: "Yes",
      createdDate: "2026-02-27",
      latitude: "22.804",
      longitude: "86.202",
      address: "Jamshedpur",
      deptName: "Water",
      serviceArea: "North",
      cluster: "Cluster A",
    },
  ];

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
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">

        <h2 className="text-lg font-semibold text-gray-700">
          Survey List
        </h2>

        <div className="flex items-center gap-3">

          {/* Search */}
          <input
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
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Export */}
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="ag-theme-alpine w-full h-[70vh] rounded-lg overflow-hidden border">

        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          pagination
          paginationPageSize={15}
          paginationPageSizeSelector={[10, 15, 25, 50]}
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
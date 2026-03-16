import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { fetchOverviewData } from "./overviewThunk";
import SummaryCards from "@/features/dashboard/Sub Features/Overview/components/SummaryCards";
import Table from "@/shared/components/UI/Table/Table";
import type { Column } from "@/shared/components/UI/Table/Table";
import Pagination from "@/shared/components/UI/Table/Pagination";
import { useListView } from "@/shared/hooks/Table/useListView";
import ListFilters from "@/shared/components/UI/ListFilters/ListFilters";
import SearchFilter from "@/shared/components/UI/Filters/SearchFilter";
import DateFilter from "@/shared/components/UI/Filters/DateFilter";
import { overviewAdapter } from "@/features/dashboard/Sub Features/Overview/overview.adapter";

import { mockOverviewData } from "@/utils/mockOverviewData";


interface SurveyRow {
  id: number;
  name: string;
  userName: string;
  surveyCount: number;
  createdAt: string;
}

const Overview = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.overview);


  const columns: Column<SurveyRow>[] = [
    { key: "name", label: "Name" },
    // { key: "userName", label: "User Name" },
    { key: "surveyCount", label: "Survey Count" },
  ];

  // const { cards, tableData } = overviewAdapter(data);

  const { cards, tableData } = overviewAdapter(mockOverviewData);

  const listView = useListView({

    data: tableData,
      itemsPerPage: 20
    // dateKey: "createdAt"
  });

  useEffect(() => {
    dispatch(fetchOverviewData());
  }, [dispatch]);

  const leftTableData = listView.paginatedData.slice(0, 10);
  const rightTableData = listView.paginatedData.slice(10, 20);







  return (
    <>
      <div className="w-full">
        <SummaryCards cards={cards} />
        {/* <SummaryCards cards={hardcodedOverviewData} /> */}
      </div>

      <div className="mt-[1%] mb-[2%]">

        <ListFilters
          title="All Users"
          totalCount={listView.totalCount}
        >

          <SearchFilter
            value={listView.searchTerm}
            onChange={listView.setSearchTerm}
            placeholder="Search user"
          />

          <DateFilter
            onChange={listView.setDateRange}
          />

        </ListFilters>

      </div>

      {/* TABLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Table<SurveyRow>
          columns={columns}
          data={leftTableData}
          loading={loading}
          emptyMessage="No survey data"
        />

        <Table<SurveyRow>
          columns={columns}
          data={rightTableData}
          loading={loading}
          emptyMessage="No survey data"
        />

      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={listView.currentPage}
        totalPages={listView.totalPages}
        onPageChange={listView.setCurrentPage}
        
        itemsPerPage={listView.itemsPerPage}
        totalCount={listView.totalCount}
      />
    </>
  );
};

export default Overview;
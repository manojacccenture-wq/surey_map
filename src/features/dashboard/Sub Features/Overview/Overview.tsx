import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { fetchOverviewData } from "./overviewThunk";
import SummaryCards from "./components/SummaryCards";
import Table from "@/shared/components/UI/Table/Table";
import type { Column } from "@/shared/components/UI/Table/Table";
import Pagination from "@/shared/components/UI/Table/Pagination";
import { useListView } from "@/shared/hooks/Table/useListView";
import total_user from "@/assets/Images/Page_Image/Dashboard/User/Total_User.png"
import ListFilters from "@/shared/components/UI/ListFilters/ListFilters";
import SearchFilter from "@/shared/components/UI/Filters/SearchFilter";
import DateFilter from "@/shared/components/UI/Filters/DateFilter";
import { overviewAdapter } from "@/features/dashboard/Sub Features/Overview/overview.adapter";


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

  const hardcodedOverviewData = [
    {
      label: "Completed",
      value: "1160",

      bgColor: "#2E86DE",
      valueColor: '#6100FF',
      iconBg: '#6100FF',
      icon: total_user
    },
    {
      label: "Survey Users",
      value: "26",
      valueColor: '#2ECC71',
      iconBg: '#2ECC71',
      icon: total_user,

      bgColor: "#2E86DE"
    },
    {
      label: "Surveys Today",
      value: "0",
      valueColor: '#FFA800',
      iconBg: '#FFA800',
      icon: total_user
    },
    {
      label: "Service Area",
      items: [
        { name: "Bagan Area", count: 6 },
        { name: "Command Area", count: 1 },
        { name: "Lease Area", count: 3 },
        { name: "Market Area", count: 1 },
        { name: "testservice", count: 5 }
      ],
      bgColor: "#2edede",
      valueColor: '#FFA800',
      iconBg: '#2edede',
      icon: total_user
    },
    {
      label: "Depot",
      items: [
        { name: "Baridih", count: 3 },
        { name: "Northern Town", count: 6 },
        { name: "Ramdas Bhatta", count: 2 },
        { name: "testdepo", count: 2 }
      ],
      // bgColor: "#2E86DE",
      valueColor: '#FFA800',
      iconBg: '#a32ede',
      icon: total_user
    },
    {
      label: "Cluster",
      items: [
        { name: "BRD-Baridih", count: 1 },
        { name: "BRD-Sidhgora", count: 3 },
        { name: "BRM-BRM", count: 1 },
        { name: "BRM-Golmuri", count: 4 }
      ],
      bgColor: "#2E86DE",
      valueColor: '#FFA800',
      iconBg: '#2e31de',
      icon: total_user
    },
    {
      label: "Thana",
      items: [
        { name: "Birsanagar", count: 4 },
        { name: "Bistupur", count: 13 },
        { name: "Burmamines", count: 3 },
        { name: "Golmuri", count: 2 },
        { name: "Govindpur", count: 1 },
        { name: "Kadma", count: 7 },
        { name: "Sakchi", count: 5 },
        { name: "Sample Thana", count: 5 },
        { name: "Sidhgora", count: 2 },
        { name: "Sonari", count: 1 },
        { name: "Telco", count: 1 }
      ],
      bgColor: "#2E86DE",
      valueColor: '#FFA800',
      iconBg: '#2ec9de',
      icon: total_user
    }
  ];

// const tableData: SurveyRow[] = Array.from({ length: 15 }, (_, i) => ({
//   id: i + 1,
//   name: ["Manoj Kumar", "Rahul Sharma", "Amit Patel"][i % 3],
//   userName: ["Manoj", "Rahul", "Amit"][i % 3],
//   surveyCount: [120, 95, 60][i % 3],
//   createdAt: `2026-03-${String(i + 1).padStart(2, "0")}`,
// }));
  const columns: Column<SurveyRow>[] = [
    { key: "name", label: "Name" },
    { key: "userName", label: "User Name" },
    { key: "surveyCount", label: "Survey Count" },
  ];

  const { cards, tableData } = overviewAdapter(data);
  const listView = useListView({
    data: tableData,
    // dateKey: "createdAt"
  });

  useEffect(() => {
    dispatch(fetchOverviewData());
  }, [dispatch]);





  



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
      <Table<SurveyRow>
        columns={columns}
        data={listView.paginatedData}
        loading={loading}
        emptyMessage="No survey data found"
      />

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
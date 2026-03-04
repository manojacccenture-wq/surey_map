import React from 'react';
import SummaryCards from './SummaryCards';
import UserListHeader from './UserListHeader';
import UserListFilters from './UserListFilters';
import UserListTable from './UserListTable';
import Pagination from './Pagination';

const ListViewContainer = ({
  title = 'List View',
  subtitle = '',
  totalCount = 0,
  summaryCards = [],
  filterTabs = [],
  columns = [],
  data = [],
  searchValue = '',
  activeFilter = 'all',
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  onTabChange = () => {},
  onSearchChange = () => {},
  onFilterClick = () => {},
  onViewClick = () => {},
  onEditClick = () => {},
  onDeleteClick = () => {},
  onPageChange = () => {},
  onAddClick = () => {},
  showAddButton = true,
  showPagination = true,
  showActions = true
}) => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {summaryCards.length > 0 && <SummaryCards cards={summaryCards} />}

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <UserListFilters
            tabs={filterTabs}
            activeTab={activeFilter}
            onTabChange={onTabChange}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onFilterClick={onFilterClick}
            totalCount={totalCount}
          />
        </div>

        <div className="flex justify-between items-center">
          {title && <UserListHeader title={title} subtitle={subtitle} />}
          {showAddButton && (
            <button
              onClick={onAddClick}
              className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium text-sm leading-5 font-['Outfit',sans-serif] rounded-lg hover:opacity-90 transition-opacity duration-200"
            >
              Add new item
            </button>
          )}
        </div>

        <UserListTable
          columns={columns}
          data={data}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          showActions={showActions}
        />

        {showPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            totalCount={totalCount}
          />
        )}
      </div>
    </div>
  );
};

export default ListViewContainer;

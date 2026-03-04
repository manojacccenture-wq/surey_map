import React from "react";
import Button from "../../../../../shared/components/UI/Button/Button";
import Input from "../../../../../shared/components/UI/Input/Input";

const SearchIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const UserListFilters = ({
  tabs = [],
  activeTab = null,
  onTabChange = () => { },
  searchValue = "",
  onSearchChange = () => { },
  onFilterClick = () => { },
  totalCount = 0,
}) => {
  return (
    <div className="w-full bg-white p-4 rounded-xl">
      <div className="flex flex-col mb-[2%]">
        <p >
          All users ({totalCount})
        </p>
      </div>

      {/*  MAIN GRID (ALL IN ONE LINE) */}
      {/*  MAIN GRID */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-6">

        {/* ===== LEFT SIDE (Tabs) ===== */}
        <div className="flex gap-3 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
          px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap
          ${activeTab === tab.id
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-neutral-10)] text-[var(--color-text-title)]"
                }
        `}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* ===== RIGHT SIDE (Search + Filter grouped) ===== */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="relative w-64">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-neutral-40)]">
              <SearchIcon />
            </div>

            <Input
              type="text"
              placeholder="Search user"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12"
            />
          </div>

          {/* Filter Button */}
          <Button
            onClick={onFilterClick}

          >
            Filter
          </Button>

        </div>
      </div>

    </div>
  );
};

export default UserListFilters;

import { useState, useCallback } from 'react';
import { useUsers } from './useUserHooks';

export const useListView = (initialData = []) => {
  const reduxUsers = useUsers();

  const [data, setData] = useState(initialData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filteredData = useCallback(() => {
    let result = [...reduxUsers];


    if (searchTerm.trim()) {
      result = result?.filter(item =>
        Object.values(item)?.some(value =>
          String(value)?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
      );
    }

    if (activeFilter && activeFilter !== 'all') {
      result = result.filter(item =>
        item.role?.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    return result;
  }, [reduxUsers, activeFilter, searchTerm]);

  const paginatedData = useCallback(() => {
    const filtered = filteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData().length / itemsPerPage);

  return {
    data,
    setData,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    loading,
    setLoading,
    error,
    setError,
    filteredData,
    paginatedData,
    totalPages,
    totalCount: filteredData().length
  };
};

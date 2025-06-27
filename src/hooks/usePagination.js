import { useState } from 'react';

export function usePagination(totalItems, itemsPerPage = 10, initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const clampedPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (clampedPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
  const itemsOnCurrentPage = Math.max(0, endIndex - startIndex + 1);
  const canNextPage = clampedPage < totalPages;
  const canPrevPage = clampedPage > 1;

  const setPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  const nextPage = () => setPage(clampedPage + 1);
  const prevPage = () => setPage(clampedPage - 1);

  return {
    currentPage: clampedPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  };
}

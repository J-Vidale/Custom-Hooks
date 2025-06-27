import React, { useState } from "react";
import { usePagination } from "../hooks/usePagination";

export default function PaginationDemo() {
  const items = Array.from({ length: 123 }, (_, i) => `Item ${i + 1}`);
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination(items.length, 10);

  const [editingPage, setEditingPage] = useState(null);
  const currentItems = items.slice(startIndex, endIndex + 1);

  const handleFocus = () => {
    setEditingPage(null); // clear input on focus
  };

  const handleBlur = () => {
    if (editingPage !== null) {
      setPage(editingPage);
    }
    setEditingPage(null); // reset to show currentPage after blur
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && editingPage !== null) {
      e.preventDefault();
      setPage(editingPage);
      setEditingPage(null);
    }
  };

  return (
    <div className="pagination-demo">
      <h2>Pagination Demo</h2>
      <p>Total Items: {items.length}</p>
      <ul className="item-list">
        {currentItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="page-spinner-wrapper">
        <div className="page-spinner">
          <button onClick={prevPage} disabled={!canPrevPage}>
            –
          </button>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={
              editingPage !== null
                ? editingPage
                : document.activeElement === null ||
                  document.activeElement.tagName !== "INPUT"
                ? currentPage
                : ""
            }
            placeholder={editingPage === null ? String(currentPage) : ""}
            onFocus={handleFocus}
            onChange={(e) => {
              const val = e.target.value;
              setEditingPage(val === "" ? null : Number(val));
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <button onClick={nextPage} disabled={!canNextPage}>
            +
          </button>
          <span>of {totalPages}</span>
        </div>
      </div>

      <div className="pagination-container">
        <button onClick={prevPage} disabled={!canPrevPage}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>

      <p>
        Showing items {startIndex + 1} – {endIndex + 1} (this page:{" "}
        {itemsOnCurrentPage})
      </p>
    </div>
  );
}

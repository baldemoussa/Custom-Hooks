import { useState } from "react";
import usePagination from "../hooks/usePagination";

function PaginationDemo() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(100); 
  
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
  } = usePagination(totalItems, itemsPerPage);

  return (
    <section className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800 text-center">Pagination Demo</h2>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="mt-1 text-sm text-slate-500">
        <label htmlFor="ItemperPage" className="font-medium text-slate-600">Items per page:</label> 
        <select id="ItemperPage"
          className="ml-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-800 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value, 10));
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div>
        Total Items: <span className="font-medium text-slate-800">{totalItems}</span>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <label htmlFor="pageInput" className="text-sm font-medium text-slate-600">
          Jump to page:
        </label>
        <input
          id="pageInput"
          type="number"
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={(e) => setPage(parseInt(e.target.value, 10))}
          className="w-20 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-800 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
        />
      </div>
      </div>

      <ol className="mt-5 gap-2 list-decimal list-inside space-y-2 text-gray-700">
        {Array.from({ length: itemsOnCurrentPage }, (_, index) => (
          <li
            key={index}
            className="rounded-md bg-sky-50 px-4 m-1 py-1 text-sm text-sky-800"
          >
            Item {startIndex + index + 1}
          </li>
        ))}
      </ol>

      <p className="mt-4 text-sm text-slate-500 text-center">
        Showing items {startIndex + 1} - {endIndex} (Total on this page: {itemsOnCurrentPage})
      </p>

      <div className="mt-4 flex flex-wrap gap-1 justify-center">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => setPage(page)}
              disabled={isActive}
              className={
                isActive
                  ? "rounded-md bg-sky-500 px-2.5 py-1 text-sm font-medium text-white"
                  : "rounded-md bg-slate-100 px-2.5 py-1 text-sm text-slate-700 hover:bg-sky-50"
              }
            >
              {page}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={prevPage}
          disabled={!canPrevPage}
          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-slate-500">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={nextPage}
          disabled={!canNextPage}
          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default PaginationDemo;

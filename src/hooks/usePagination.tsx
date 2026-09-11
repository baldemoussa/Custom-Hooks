import { useEffect, useState } from "react"

function usePagination(totalItems: number, itemsPerPage: number, initialPage: number=1) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const itemsOnCurrentPage = endIndex - startIndex
  const canNextPage = currentPage < totalPages
  const canPrevPage = currentPage > 1

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(totalPages, 1)))
  }, [totalPages])

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }  

  return { 
        currentPage, 
        totalPages, 
        startIndex, 
        endIndex, 
        itemsOnCurrentPage, 
        setPage, 
        nextPage, 
        prevPage, 
        canNextPage, 
        canPrevPage
    }
}

export default usePagination
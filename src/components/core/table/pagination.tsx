import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import React from 'react'
import { useTableFN } from '@/hooks/use-table'

interface PaginationProps {
  page: number;
  perPage: number;
  totalPages : number
}
const PaginationTable = ({page, perPage,totalPages} : PaginationProps) => {
  const {handlePageChange} = useTableFN()
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && handlePageChange(page - 1, perPage)}
            className={`cursor-pointer ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </PaginationItem>
        {page > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(page - 1, page + 2).map((p) => (
          <PaginationItem key={p}>
            <Button variant={p === page ? "default" : "outline"} onClick={() => handlePageChange(p, perPage)}>
              {p}
            </Button>
          </PaginationItem>
        ))}
        {page < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && handlePageChange(page + 1, perPage)}
            className={`cursor-pointer ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationTable

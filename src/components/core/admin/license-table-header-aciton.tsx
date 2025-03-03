import React from 'react'
import AssignLicense from './assign-license'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTableFN } from '@/hooks/use-table'

const LicenseTableHeaderAciton = ({ id, perPage }: { id: number, perPage: number }) => {
  const { handlePerPageChange } = useTableFN()
  return (
    <div className="flex justify-end items-center gap-2 mb-4">
      <AssignLicense clientId={id} />
      <Select onValueChange={handlePerPageChange} defaultValue={String(perPage)}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default LicenseTableHeaderAciton
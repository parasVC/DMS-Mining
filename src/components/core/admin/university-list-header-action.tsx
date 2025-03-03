import React from 'react'
import CreateUniversityForm from './create-univeristy'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTableFN } from '@/hooks/use-table'

const UniversityListHeaderAction = ({perPage}:{perPage : number}) => {
const { handlePerPageChange } = useTableFN()
  return (
    <div className="flex justify-end items-center gap-2 mb-4">
                <CreateUniversityForm />
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

export default UniversityListHeaderAction
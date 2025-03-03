'use client'
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import PaginationTable from '@/components/core/table/pagination';
import DataTable from '@/components/core/table/table'
import StudentListHeaderAction from "./student-list-header-action";


interface TableComponentProps {
    data: TableDataProps[];
    page: number;
    totalPages: number;
    perPage: number;
    details: {
        remaining_licenses_count: number,
        total_licenses_count: number
    }
}

export default function StudentsListTable({ data, page, totalPages, perPage, details }: TableComponentProps) {
    return (
        <div className="space-y-4">
            {/*Header Action*/}
            <StudentListHeaderAction details={details} />
            {/*Filter*/}
            <Filter filterType={"students_list"} />
            {/* Table */}
            <DataTable data={data} role={"students_list"} />
            {/* Pagination*/}
            <PaginationTable page={page} perPage={perPage} totalPages={totalPages} />
        </div>
    );
}

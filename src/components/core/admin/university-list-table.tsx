'use client'
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import UniversityListHeaderAction from "./university-list-header-action";
import PaginationTable from '@/components/core/table/pagination';
import DataTable from '@/components/core/table/table'


interface TableComponentProps {
    data: TableDataProps[];
    total: number;
    page: number;
    totalPages: number;
    perPage : number
}

export default function UniversityListTable({ data, page, totalPages,perPage }: TableComponentProps) {
    return (
        <div className="space-y-4">
            {/*Header Action*/}
            <UniversityListHeaderAction perPage={perPage} />
            {/*Filter*/}
            <Filter filterType={"university_list"} />
            {/* Table */}
            <DataTable data={data} role={"university_list"} />
            {/* Pagination*/}
            <PaginationTable page={page} perPage={perPage} totalPages={totalPages}/>
        </div>
    );
}

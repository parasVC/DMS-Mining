'use client'
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import LicenseTableHeaderAciton from "./license-table-header-aciton";
import PaginationTable from '@/components/core/table/pagination';
import DataTable from '@/components/core/table/table'


interface TableComponentProps {
    data: TableDataProps[];
    total: number;
    page: number;
    totalPages: number;
    perPage : number;
    university_id : number
}

export default function LicenseHistoryTable({ data, page, totalPages,perPage, university_id }: TableComponentProps) {
    return (
        <div className="space-y-4">
            {/*Header Action*/}
            <LicenseTableHeaderAciton id={university_id} perPage={perPage} />
            {/*Filter*/}
            <Filter filterType={"university_license_history"} />
            {/* Table */}
            <DataTable data={data} role={"license_history_list"} />
            {/* Pagination*/}
            <PaginationTable page={page} perPage={perPage} totalPages={totalPages}/>
        </div>
    );
}

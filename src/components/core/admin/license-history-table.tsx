'use client'
import { useEffect } from "react";
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import LicenseTableHeaderAciton from "./license-table-header-aciton";
import PaginationTable from '@/components/core/table/pagination';
import DataTable from '@/components/core/table/table'
import { useBreadcrumb } from "@/context/BreadcrumbContext";

interface TableComponentProps {
    data: TableDataProps[];
    total: number;
    page: number;
    totalPages: number;
    perPage : number;
    university_id : number;
    university_name : string
}

export default function LicenseHistoryTable({ data, page, totalPages, perPage, university_id ,university_name}: TableComponentProps) {
    const { setBreadcrumbs } = useBreadcrumb();

    useEffect(() => {
      setBreadcrumbs([
        { label: "University", href: "/admin/university" },
        { label: university_name, href: "" },
      ]);
    }, [setBreadcrumbs]);
    return (
        <div className="space-y-4">
            <LicenseTableHeaderAciton id={university_id} perPage={perPage} />
            <Filter filterType={"university_license_history"} />
            <DataTable data={data} role={"license_history_list"} />
            <PaginationTable page={page} perPage={perPage} totalPages={totalPages}/>
        </div>
    );
}

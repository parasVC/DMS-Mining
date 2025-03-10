'use client';

import { useEffect } from "react";
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import UniversityListHeaderAction from "./university-list-header-action";
import PaginationTable from '@/components/core/table/pagination';
import DataTable from '@/components/core/table/table'
import { useBreadcrumb } from "@/context/BreadcrumbContext";


interface TableComponentProps {
    data: TableDataProps[];
    total: number;
    page: number;
    totalPages: number;
    perPage : number
}

export default function UniversityListTable({ data, page, totalPages,perPage }: TableComponentProps) {
    const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([
      { label: "University", href: "#" },
    ]);
  }, [setBreadcrumbs]);

    return (
        <div className="space-y-4">
            <UniversityListHeaderAction perPage={perPage} />
            <Filter filterType={"university_list"} />
            <DataTable data={data} role={"university_list"} />
            <PaginationTable page={page} perPage={perPage} totalPages={totalPages}/>
        </div>
    );
}

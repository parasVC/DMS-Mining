"use client";
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import DataTable from "@/components/core/table/table";
import StudentListHeaderAction from "./student-list-header-action";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { useEffect } from "react";
import { FilterProvider } from "@/context/filter-context";

interface TableComponentProps {
  data: {
    data: TableDataProps[];
    pages: number
  }
  url: string
  details: {
    remaining_licenses_count: number;
    total_licenses_count: number;
  };
}

export default function StudentsListTable({
  data,
  details,
  url
}: TableComponentProps) {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([{ label: "Student", href: "#" }]);
  }, [setBreadcrumbs]);



  return (
    <div className="space-y-4">
      <FilterProvider>
        {/*Header Action*/}
        <StudentListHeaderAction details={details} />
        {/*Filter*/}
        <Filter filterType={"students_list"} />
        {/* Table */}
        <DataTable data={data} role={"students_list"} url={url} isPagination={true} />
      </FilterProvider>
    </div>
  );
}

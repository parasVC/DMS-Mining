"use client";
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import PaginationTable from "@/components/core/table/pagination";
import DataTable from "@/components/core/table/table";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useEffect } from "react";

interface TableComponentProps {
  data: TableDataProps[];
  page: number;
  totalPages: number;
  perPage: number;
}

export default function LicenseListTable({
  data,
  page,
  totalPages,
  perPage,
}: TableComponentProps) {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([{ label: "Student", href: "#" }]);
  }, [setBreadcrumbs]);
  return (
    <div className="space-y-4">
      {/*Filter*/}
      <Filter filterType={"license_list"} />
      {/* Table */}
      <DataTable data={data} role={"license_list"} />
      {/* Pagination*/}
      <PaginationTable page={page} perPage={perPage} totalPages={totalPages} />
    </div>
  );
}

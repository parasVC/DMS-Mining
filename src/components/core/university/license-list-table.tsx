"use client";
import { TableDataProps } from "@/data/table/table-columns";
import Filter from "@/components/core/table/filter";
import DataTable from "@/components/core/table/table";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { useEffect } from "react";
import { FilterProvider } from "@/context/filter-context";

interface TableComponentProps {
  data: {
    data: TableDataProps[];
    pages: number
  }
  url: string
}

export default function LicenseListTable({
  data,
  url
}: TableComponentProps) {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([{ label: "Licenses", href: "#" }]);
  }, [setBreadcrumbs]);



  return (
    <div className="space-y-4">
      <FilterProvider>
        {/*Filter*/}
        <Filter filterType={"license_list"} />
        {/* Table */}
        <DataTable data={data} role={"license_list"} url={url} isPagination={true} />
      </FilterProvider>
    </div>
  );
}

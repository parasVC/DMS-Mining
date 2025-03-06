"use client";
import { TableDataProps } from "@/data/table/table-columns";
import DataTable from "@/components/core/table/table";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useEffect } from "react";
import CreateSeed from "./create-seed";

interface TableComponentProps {
    data: TableDataProps[];
}

export default function SeedListTable({
    data,
}: TableComponentProps) {
    const { setBreadcrumbs } = useBreadcrumb();

    useEffect(() => {
        setBreadcrumbs([{ label: "Student", href: "" }]);
    }, [setBreadcrumbs]);
    return (
        <div className="space-y-4">
            {/* header */}
             <CreateSeed/>
            {/* Table */}
            <DataTable data={data} role={"seed_list"} />
        </div>
    );
}

"use client";
import { TableDataProps } from "@/data/table/table-columns";
import DataTable from "@/components/core/table/table";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import { useEffect } from "react";
import CreateSeed from "./create-seed";
import { FilterProvider } from "@/context/filter-context";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface TableComponentProps {
    data: {
        data: TableDataProps[];
        pages: number
    }
    url: string
}

export default function SeedListTable({
    data,
    url
}: TableComponentProps) {
    const { setBreadcrumbs } = useBreadcrumb();

    useEffect(() => {
        setBreadcrumbs([{ label: "Seeds", href: "#" }]);
    }, [setBreadcrumbs]);
    return (
        <div className="space-y-4">
            <div className="text-right">
                <Button
                    className="p-3"
                    variant={"outline"}
                    onClick={() => alert("File downloaded")}
                >
                    <Download />
                    <span className="text-sm">Download</span>
                </Button>
            </div>
            <FilterProvider>
                <CreateSeed />
                {/* Table */}
                <DataTable data={data} role={"seed_list"} isPagination={true} url={url} />
            </FilterProvider>
        </div>
    );
}

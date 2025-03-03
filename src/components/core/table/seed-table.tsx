"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Eye, MoreHorizontal } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FIELD_PARAMS } from "@/constant/params";
import CreateSeed from "@/components/core/university/create-seed";

interface DataItem {
    id: number
    [FIELD_PARAMS.ROLE_ID]: string
    [FIELD_PARAMS.FIRST_NAME]: string
    [FIELD_PARAMS.LAST_NAME]: string
    email: string
    contact: string
    [FIELD_PARAMS.USER_TYPE]: string
    status: boolean | null
    [FIELD_PARAMS.LICENSE_NUMBER]: string
    address: string
    [FIELD_PARAMS.ASSIGN_LICENSE]: boolean
    [FIELD_PARAMS.CREATED_AT]: string
    [FIELD_PARAMS.UNIVERSITY_NAME]: string
    [FIELD_PARAMS.SEED_NUMBER]: number
}

interface TableComponentProps {
    data: DataItem[];
    page: number;
    totalPages: number;
}

export default function SeedTable({ data = [], page, totalPages }: TableComponentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const perPage = searchParams.get("per_page") ? Number(searchParams.get("per_page")) : 10;


    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        params.set("per_page", perPage.toString());
        router.push(`?${params.toString()}`);
    };

    // 🔹 Define columns dynamically
    const columns = [
        { key: FIELD_PARAMS.SEED_NUMBER, label: "Seed number" },
        { key: FIELD_PARAMS.CREATED_AT, label: "Created Date", format: (value: string) => format(new Date(value), "yyyy-MM-dd") },
        { key: "actions", label: "Actions" }, // Extra actions column
    ];

    return (
        <div className="space-y-4">
                <CreateSeed />
            {/* Table */}
            <Table className="border-x border-y">
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={`header-${col.key}`}>{col.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length ? (
                        data.map((item,index) => (
                            <TableRow key={`row-${index}`}>
                                {columns.map((col, index) => (
                                    <TableCell key={`cell-${item.id}-${col.key}-${index}`}>
                                        {col.key === "actions" ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <Button
                                                        onClick={() => console.log(`/university/view/${item.id}`)}
                                                        variant={"ghost"}
                                                        className="p-2 w-full flex gap-3 justify-start items-center"
                                                    >
                                                        <Eye size={16} />
                                                        View
                                                    </Button>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : col.format ? (
                                            col.format(item[col.key])
                                        ) : (
                                            (item[col.key as keyof DataItem] as string)
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                No data available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>


            {/* Pagination */}
                <Pagination className="flex justify-end">
                <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => page > 1 && handlePageChange(page - 1)}
                                className={`cursor-pointer ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                            />
                        </PaginationItem>
                        {page > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(page - 1, page + 2).map((p) => (
                            <PaginationItem key={p}>
                                <Button variant={p === page ? "default" : "outline"} onClick={() => handlePageChange(p)}>
                                    {p}
                                </Button>
                            </PaginationItem>
                        ))}
                        {page < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => page < totalPages && handlePageChange(page + 1)}
                                className={`cursor-pointer ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
        </div>
    );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { CalendarIcon, MoreHorizontal } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { FIELD_PARAMS } from "@/constant/params";
import { Label } from "@/components/ui/label";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useEffect } from "react";
import { DayPicker } from "react-day-picker";

interface DataItem {
  id: number;
  [FIELD_PARAMS.LICENSE_STATUS]: string;
  [FIELD_PARAMS.LICENSE_KEY]: string;
  [FIELD_PARAMS.IS_ASSIGNED]: boolean;
  [FIELD_PARAMS.CREATED_AT]: string;
  [FIELD_PARAMS.EXPIRY_DATE]: string;
}

interface TableComponentProps {
  data: DataItem[];
  page: number;
  totalPages: number;
}

export default function LicenseTable({
  data = [],
  page,
  totalPages,
}: TableComponentProps) {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([{ label: "License", href: "" }]);
  }, [setBreadcrumbs]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  // Extract filters dynamically
  const filters = {
    [FIELD_PARAMS.LICENSE_NUMBER]:
      searchParams.get(FIELD_PARAMS.LICENSE_NUMBER) || "",
    [FIELD_PARAMS.CREATED_AT]: searchParams.get(FIELD_PARAMS.CREATED_AT) || "",
    [FIELD_PARAMS.ASSIGNED_STATUS]:
      searchParams.get(FIELD_PARAMS.ASSIGNED_STATUS) || "",
    status: searchParams.get("status") || "",
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    params.set("per_page", perPage.toString());
    router.push(`?${params.toString()}`);
  };

  // 🔹 Define columns dynamically
  const columns = [
    { key: "id", label: "Sr. No" },
    { key: FIELD_PARAMS.LICENSE_KEY, label: "License Number" },
    {
      key: FIELD_PARAMS.EXPIRY_DATE,
      label: "Valid Till",
      format: (value: string) => format(new Date(value), "yyyy-MM-dd"),
    },
    { key: FIELD_PARAMS.LICENSE_STATUS, label: "Status" },
    { key: FIELD_PARAMS.IS_ASSIGNED, label: "Assigned Status" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <Label>License Number</Label>
          <Input
            placeholder="License Number"
            defaultValue={filters[FIELD_PARAMS.LICENSE_NUMBER]}
            onBlur={(e) =>
              updateFilter(FIELD_PARAMS.LICENSE_NUMBER, e.target.value)
            }
          />
        </div>

        {/* Date Picker */}
        <div>
          <Label>Created Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters[FIELD_PARAMS.CREATED_AT]
                  ? format(
                      parseISO(filters[FIELD_PARAMS.CREATED_AT]),
                      "yyyy-MM-dd"
                    )
                  : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <DayPicker
                mode="single"
                selected={
                  filters[FIELD_PARAMS.CREATED_AT]
                    ? parseISO(filters[FIELD_PARAMS.CREATED_AT])
                    : undefined
                }
                onSelect={(date) =>
                  updateFilter(
                    FIELD_PARAMS.CREATED_AT,
                    date ? format(date, "yyyy-MM-dd") : ""
                  )
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Status Filter */}
        <div>
          <Label>Status</Label>
          <Select
            defaultValue={filters.status || "all"}
            onValueChange={(value) => updateFilter("status", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Not Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Assigned Status</Label>
          <Select
            defaultValue={filters[FIELD_PARAMS.ASSIGNED_STATUS] || "all"}
            onValueChange={(value) =>
              updateFilter(FIELD_PARAMS.ASSIGNED_STATUS, value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="notassigned">Not Assigned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
            data.map((item, index) => (
              <TableRow key={`row-${item.id}-${index}`}>
                {columns.map((col) => (
                  <TableCell key={`cell-${item.id}-${col.key}-${index}`}>
                    {col.key === "actions" ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                      </DropdownMenu>
                    ) : col.key === FIELD_PARAMS.LICENSE_STATUS ? ( // Check if column is "status"
                      <Badge
                        className={
                          item[FIELD_PARAMS.LICENSE_STATUS] === "ACTIVE"
                            ? "bg-[#84CC16] text-white"
                            : "bg-red-500 text-white"
                        }
                      >
                        {item[FIELD_PARAMS.LICENSE_STATUS] === "ACTIVE"
                          ? "Active"
                          : "Not Active"}
                      </Badge>
                    ) : col.key === FIELD_PARAMS.IS_ASSIGNED ? ( // Check if column is "status"
                      <Badge
                        className={
                          item[FIELD_PARAMS.IS_ASSIGNED]
                            ? "bg-[#84CC16] text-white"
                            : "bg-[#FFC130] text-white"
                        }
                      >
                        {item[FIELD_PARAMS.IS_ASSIGNED]
                          ? "Assign"
                          : "Not Assign"}
                      </Badge>
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
              className={`cursor-pointer ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>
          {page > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(page - 1, page + 2)
            .map((p) => (
              <PaginationItem key={p}>
                <Button
                  variant={p === page ? "default" : "outline"}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </Button>
              </PaginationItem>
            ))}
          {page < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && handlePageChange(page + 1)}
              className={`cursor-pointer ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTableFN } from "@/hooks/use-table";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { filterField } from "@/data/table/filter-fields";
import { Label } from "@/components/ui/label";
import { DayPicker } from "react-day-picker";

const Filter = ({ filterType }: { filterType: string }) => {
  const searchParams = useSearchParams();
  const { updateFilter } = useTableFN();

  const filters = filterField[filterType as keyof typeof filterField];
  const createdAtValue = searchParams.get(filters.created_at?.key ?? "") ?? "";

  return (
    <div className="flex gap-4 w-full">
      {filters.input &&
        filters.input.length > 0 &&
        filters.input.map((ele, i) => (
          <div
            key={`filter-${ele.key}-${i}`}
            className="flex flex-col gap-3 w-full"
          >
            <Label>{ele.label}</Label>
            <Input
              defaultValue={searchParams.get(ele.key ?? "") || ""}
              onBlur={(e) => updateFilter(ele.key, e.target.value)}
            />
          </div>
        ))}

      {/* Date Picker */}
      {filters.created_at && (
        <div className="flex flex-col gap-3 w-full">
          <Label>{filters.created_at.label}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <CalendarIcon className="h-4 w-4" />
                {createdAtValue
                  ? format(parseISO(createdAtValue), "yyyy-MM-dd")
                  : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <DayPicker
                mode="single"
                selected={createdAtValue ? parseISO(createdAtValue) : undefined}
                onSelect={(date) => {
                  if (filters.created_at?.key) {
                    updateFilter(
                      filters.created_at?.key,
                      date ? format(date, "yyyy-MM-dd") : ""
                    );
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Status Filter */}
      {filters.select &&
        filters.select.length > 0 &&
        filters.select.map((selectItem, index) => (
          <div className="flex flex-col gap-3 w-full" key={`select-${index}`}>
            <Label>{selectItem.label}</Label>
            <Select
              defaultValue={searchParams.get(selectItem.key ?? "") || "all"}
              onValueChange={(value) => {
                if (selectItem.key) {
                  updateFilter(selectItem.key, value);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {selectItem.fields.map((field, i) => (
                  <SelectItem
                    key={`filter-${field.label}-${i}`}
                    value={field.defaultValue}
                  >
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
    </div>
  );
};

export default Filter;

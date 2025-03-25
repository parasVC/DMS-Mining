"use client";
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { FIELD_PARAMS } from '@/constant/params';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import { dashboardData, DashboardDataProps } from "@/data/dashboard-items";
import { useEffect } from 'react';

interface DashboardComponentProps {
    data: DashboardDataProps;
    role: string,
    isError: boolean,
    msg: string
}

export default function DashboardPage({ data, role, isError, msg }: DashboardComponentProps) {
    const columns = dashboardData[role as keyof typeof dashboardData];

    const { setBreadcrumbs } = useBreadcrumb();

    useEffect(() => {
        if (isError) throw new Error(msg || "Something went wrong");
        setBreadcrumbs([
            { label: "Dashboard", href: "#" },
        ]);
    }, [setBreadcrumbs]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[150px] w-full justify-items-center">
            {columns.length > 0 ? (columns.map((value) => (
                <Card key={value.dataFields.join("-")} className="flex flex-col justify-center items-center p-5 gap-3 rounded-m w-full max-w-[450px] min-h-[200px] text-center">
                    {value.dataFields.length === 2 && value.dataFields.includes(FIELD_PARAMS.ASSIGNED_LICENSES) ? (
                        <>
                            <CardTitle className="w-full flex items-center text-xl font-medium pt-2">
                                <span className="w-[45%] text-right">Assigned</span>
                                <span className="w-[10%] text-center">|</span>
                                <span className="w-[45%] text-left">Unassigned</span>
                            </CardTitle>
                            <CardContent className="w-full flex items-center text-3xl font-semibold">
                                <span className="w-[45%] text-center">{data[FIELD_PARAMS.ASSIGNED_LICENSES] || "N/A"}</span>
                                <span className="w-[10%] text-center">|</span>
                                <span className="w-[45%] text-left">{data[FIELD_PARAMS.UNASSIGNED_LICENSES] || "N/A"}</span>
                            </CardContent>
                        </>
                    ) : (
                        <>
                            <CardTitle className="text-xl font-medium pt-2">{value.label}</CardTitle>
                            <CardContent className="text-3xl font-semibold mr-[9px]">
                                {value.dataFields
                                    .map((key) => data[key])
                                    .filter((val) => val !== undefined)
                                    .join(" | ") || "N/A"}
                            </CardContent>
                        </>
                    )}
                </Card>
            ))) : <></>}
        </div>
    )
}

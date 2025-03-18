"use client";
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useBreadcrumb } from '@/context/breadcrumb-context';
import { dashboardData, DashboardDataProps } from "@/data/dashboard-items";
import { useEffect } from 'react';

interface DashboardComponentProps {
    data: DashboardDataProps;
    role: string
}

export default function DashboardPage({ data, role }: DashboardComponentProps) {
    const columns = dashboardData[role as keyof typeof dashboardData];

    const { setBreadcrumbs } = useBreadcrumb();

    useEffect(() => {
        setBreadcrumbs([
            { label: "Dashboard", href: "#" },
        ]);
    }, [setBreadcrumbs]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[150px]">
            {columns.length > 0 ? (columns.map((value) => (
                <Card key={value.dataFields.join("-")} className="flex flex-col justify-center items-center p-5 gap-3 rounded-m text-center">
                    <CardTitle className="text-xl font-medium pt-2">{value.label}</CardTitle>
                    <CardContent className="text-2xl font-semibold">
                        {value.dataFields
                            .map((key) => data[key])
                            .filter((val) => val !== undefined)
                            .join(" / ") || "N/A"}
                    </CardContent>
                </Card>
            ))) : <></>}
        </div>
    )
}

import UniveristyAableAction from "@/components/core/admin/univeristy-table-action";
import StudentTableAction from "@/components/core/university/student-table-action";
import { Badge } from "@/components/ui/badge";
import { FIELD_PARAMS } from "@/constant/params";
import { format } from "date-fns";
import Link from "next/link";
import { ReactNode } from "react";


export interface TableDataProps {
    id: number;
    email: string
    contact: string
    address: string
    status: boolean;
    actions: ReactNode;
    [FIELD_PARAMS.UNIVERSITY_NAME]: string;
    [FIELD_PARAMS.CREATED_AT]: string;
    [FIELD_PARAMS.TOTAL_STUDENTS]: number;
    [FIELD_PARAMS.TOTAL_LICENSES]: number;
    [FIELD_PARAMS.ROLE_ID]: string;
    [FIELD_PARAMS.ROLE_ID]: string
    [FIELD_PARAMS.FIRST_NAME]: string
    [FIELD_PARAMS.LAST_NAME]: string
    [FIELD_PARAMS.USER_TYPE]: string
    [FIELD_PARAMS.LICENSE_NUMBER]: string
    [FIELD_PARAMS.ASSIGN_LICENSE]: boolean
    [FIELD_PARAMS.CREATED_AT]: string
    [FIELD_PARAMS.UNIVERSITY_NAME]: string
}

export const tableColumn = {
    university_list: [
        { key: FIELD_PARAMS.ROLE_ID, label: "ID", render:(props: TableDataProps) => {
                return (
                    <Link href={`/admin/university/view/${props.id}`} className="underline text-orange-600 font-medium">
                        {props[FIELD_PARAMS.ROLE_ID]}
                    </Link>
                )
        } },
        { key: FIELD_PARAMS.UNIVERSITY_NAME, label: "University Name" },
        { key: FIELD_PARAMS.CREATED_AT, label: "Created Date", format: (value: string) => format(new Date(value), "yyyy-MM-dd") },
        { key: FIELD_PARAMS.TOTAL_STUDENTS, label: "No. of Students" },
        { key: FIELD_PARAMS.TOTAL_LICENSES, label: "No. of Licenses" },
        {
            key: "status", label: "Status", render: (props: TableDataProps) => {
                return (
                    <Badge className={props.status ? "bg-[#84CC16] text-white" : "bg-[#F59E0B] text-white"}>
                        {props.status ? "Active" : "Not Active"}
                    </Badge>
                )
            }
        },
        {
            key: "actions", label: "Actions", render: (props: TableDataProps) => {
                return (
                    <UniveristyAableAction id={props.id} university_name={props[FIELD_PARAMS.UNIVERSITY_NAME]} />
                )
            }
        }
    ] as {
        key: keyof TableDataProps;
        label: string;
        render?: (prop: TableDataProps) => ReactNode;
        customRender?: () => ReactNode;
        format?: (value: string) => string;
    }[],
    license_history_list: [
        { key: "id", label: "Sr. No" },
        { key: FIELD_PARAMS.TOTAL_LICENSES, label: "Number of Licenses" },
        { key: FIELD_PARAMS.CREATED_AT, label: "Created Date", format: (value: string) => format(new Date(value), "yyyy-MM-dd") },
        { key: FIELD_PARAMS.EXPIRY_DATE, label: "Valid Till", format: (value: string) => format(new Date(value), "yyyy-MM-dd") },
        {
            key: "status", label: "Status", render: (props: TableDataProps) => {
                return (
                    <Badge className={props.status ? "bg-[#84CC16] text-white" : "bg-[#F59E0B] text-white"}>
                        {props.status ? "Active" : "Not Active"}
                    </Badge>
                )
            }
        }
    ] as {
        key: keyof TableDataProps;
        label: string;
        render?: (prop: TableDataProps) => ReactNode;
        customRender?: () => ReactNode;
        format?: (value: string) => string;
    }[],
    students_list: [
        { key: FIELD_PARAMS.ROLE_ID, label: "Role ID", render:(props: TableDataProps) => {
                return (
                    <Link href={`/university/student/view/${props.id}`} className="underline text-blue-600 font-medium">
                        {props[FIELD_PARAMS.ROLE_ID]}
                    </Link>
                )
        } },
        { key: FIELD_PARAMS.STUDENT_NAME, label: "Name",render(prop) {
                return `${prop[FIELD_PARAMS.FIRST_NAME]} ${prop[FIELD_PARAMS.LAST_NAME]}`
        }, },
        { key: FIELD_PARAMS.CREATED_AT, label: "Enrollment Date", format: (value: string) => format(new Date(value), "yyyy-MM-dd") },
        { key: FIELD_PARAMS.LICENSE_NUMBER, label: "License Number" },
        {
            key: "status", label: "Status", render: (props: TableDataProps) => {
                return (
                    <Badge className={props.status ? "bg-[#84CC16] text-white" : "bg-red-500 text-white"}>
                        {props.status ? "Active" : "Not Active"}
                    </Badge>
                )
            }
        },
        {
            key: "actions", label: "Actions", render: (props: TableDataProps) => {
                return (
                    <StudentTableAction {...props} />
                )
            }
        }
    ] as {
        key: keyof TableDataProps;
        label: string;
        render?: (prop: TableDataProps) => ReactNode;
        customRender?: () => ReactNode;
        format?: (value: string) => string;
    }[],
    license_list: [
        { key: "id", label: "Sr. No" },
        { key: FIELD_PARAMS.LICENSE_KEY, label: "License Number" },
        {
            key: FIELD_PARAMS.EXPIRY_DATE,
            label: "Valid Till",
            format: (value: string) => format(new Date(value), "yyyy-MM-dd"),
        },
        {
            key: FIELD_PARAMS.IS_ASSIGNED, label: "Assigned Status", render: (props: TableDataProps) => {
                return (
                    <Badge className={props[FIELD_PARAMS.IS_ASSIGNED] ? "bg-[#84CC16] text-white"
                        : "bg-[#FFC130] text-white"}>
                        {props[FIELD_PARAMS.IS_ASSIGNED] ? "Assigned" : "Not Assigned"}
                    </Badge>
                )
            }
        }
    ] as {
        key: keyof TableDataProps;
        label: string;
        render?: (prop: TableDataProps) => ReactNode;
        customRender?: () => ReactNode;
        format?: (value: string) => string;
    }[],
    seed_list: [
        { key: FIELD_PARAMS.SEED_NUMBER, label: "Seed number" },
        { key: FIELD_PARAMS.CREATED_AT, label: "Created Date", format: (value: string) => format(new Date(value), "yyyy-MM-dd") },
    ] as {
        key: keyof TableDataProps;
        label: string;
        format?: (value: string) => string;
    }[],
};
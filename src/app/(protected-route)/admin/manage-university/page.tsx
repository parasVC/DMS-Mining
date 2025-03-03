import UniversityListTable from "@/components/core/admin/university-list-table";
import { reqeustServer } from "@/actions/reqeust-server-api";
import { FIELD_PARAMS } from "@/constant/params";
import { redirect } from "next/navigation";

interface searchParamsProps {
    searchParams: {
        page?: string;
        per_page?: string;
        status?: string;
        [FIELD_PARAMS.CREATED_AT]?: string;
        [FIELD_PARAMS.UNIVERSITY_NAME]?: string
    }
}
export default async function TablePage({ searchParams }: searchParamsProps) {
    const { per_page, page, status, university_name, created_at } = await searchParams

    const perPage = per_page ? Number(per_page) : 10;
    const pageVal = page ? Number(page) : 1;
    const statusVal = status ? status : "";
    const res = await reqeustServer({
        url: `client/list/data?page=${pageVal}&per_page=${perPage}`,
        method: "POST",
        body: {
            status: statusVal,
            created_at: created_at ? created_at : "",
            university_name: university_name ? university_name : ""
        },
        token: true
    })

    if (res.statusCode === 401) {
        redirect("/auth/login")
    }

    return <UniversityListTable
        data={res.data.data}
        page={pageVal}
        perPage={perPage}
        total={res.data.total}
        totalPages={res.data.pages}
    />;
}

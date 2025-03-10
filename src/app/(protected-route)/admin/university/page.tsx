import UniversityListTable from "@/components/core/admin/university-list-table";
import { redirect } from "next/navigation";
import { fetchData } from "@/lib/request/fetch-data";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function TablePage({ searchParams }: any) {
    const { per_page, page, status, university_name, created_at } = await searchParams

    const perPage = per_page ? Number(per_page) : 10;
    const pageVal = page ? Number(page) : 1;
    const statusVal = status ? status : "";
    const universityName = university_name ? university_name : "";
    const createdAt = created_at ? created_at : "";
    let res;
    try {
        res = await fetchData({
            url: `client/list/data?page=${pageVal}&per_page=${perPage}&status=${statusVal}&created_at=${createdAt}&university_name=${universityName}`,
            method: "GET",
            token: true
        })
    } catch (error) {
        if (error.status === 401) {
            redirect("/auth/login");
        } else {
            throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }

    return <UniversityListTable
        data={res.data.data}
        page={pageVal}
        perPage={perPage}
        total={res.data.total}
        totalPages={res.data.pages}
    />;
}

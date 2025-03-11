import UniversityListTable from "@/components/core/admin/university-list-table";
import { redirect } from "next/navigation";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";

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
        if (axios.isAxiosError(error) && error.response) {
            if ( error.response.status === 401) {
                redirect("/auth/login");
            } else if (error.response.data) {
                throw new Error(error.response.data.message || "Something went wrong");
            } else {
                throw new Error(error.message || "Something went wrong");
            }
        } else {
            throw new Error(error.message || "Something went wrong");
        }
    }

    return <UniversityListTable
        data={res.data}
       url="client/list/data"
    />;
}

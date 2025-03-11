import SeedListTable from "@/components/core/university/seed-list-table";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function SeedPage({ searchParams }: any) {

  const { per_page, page } = await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  let res;
  try {
    res = await fetchData({
      url: `seed/list/pagination?page=${pageVal}&per_page=${perPage}`,
      method: "GET",
      token: true
    })

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
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

  return <SeedListTable data={res.data} url={"seed/list/pagination"} />;
}

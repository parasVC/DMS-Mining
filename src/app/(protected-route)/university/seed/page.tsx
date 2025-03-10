import { reqeustServer } from "@/actions/reqeust-server-api";
import SeedListTable from "@/components/core/university/seed-list-table";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function SeedPage({ searchParams }: any) {

  const { per_page, page } = await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  let res;
  try {
    res = await reqeustServer({
      url: `seed/list/pagination?page=${pageVal}&per_page=${perPage}`,
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

  return <SeedListTable data={res.data.data} page={pageVal} totalPages={res.data.pages} perPage={perPage} />;
}

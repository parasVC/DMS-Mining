import { reqeustServer } from "@/actions/reqeust-server-api";
import SeedTable from "@/components/core/table/seed-table";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function SeedPage({ searchParams }: any) {
  const { per_page, page } = await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;

  const res = await reqeustServer({
    url: `seed/list/data?page=${pageVal}&&per_page=${perPage}`,
    method: "GET",
    token: true
  })

  
  if (res.statusCode === 401) {
    redirect("/auth/login")
  }
//set totol pages when it'll get
  return <SeedTable data={res.data ? res.data : []} page={pageVal} totalPages={1} />;
}

import { reqeustServer } from "@/actions/reqeust-server-api";
import LicenseListTable from "@/components/core/university/license-list-table";
import { redirect } from "next/navigation";


/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function ManageLicensepage({ searchParams }: any) {
  const { per_page, page,assigned_status, created_at, license_number } = await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;

  const res = await reqeustServer({
    url: `license/list?page=${pageVal}&&per_page=${perPage}`,
    method: "POST",
    body: {
      created_at: created_at ? created_at : "",
      assigned_status: assigned_status ? assigned_status : "",
      license_number: license_number ? license_number : "",
    },
    token: true
  })
  
  if(res.status === "fail") throw new Error(res.message);
    
  if (res.statusCode === 401) {
    redirect("/auth/login")
  }

  return <LicenseListTable data={res.data.data} page={pageVal} totalPages={res.data.pages} perPage={perPage}/>;
}

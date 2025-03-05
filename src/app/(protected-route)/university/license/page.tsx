import { reqeustServer } from "@/actions/reqeust-server-api";
import LicenseTable from "@/components/core/table/license-table";
import { redirect } from "next/navigation";


/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function ManageLicensepage({ searchParams }: any) {
  const { per_page, page, status,assigned_status, created_at, license_number } = await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  const statusVal = status ? status : "";

  const res = await reqeustServer({
    url: `license/list?page=${pageVal}&&per_page=${perPage}`,
    method: "POST",
    body: {
      status: statusVal,
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

  return <LicenseTable data={res.data.data} page={pageVal} totalPages={res.data.pages} />;
}

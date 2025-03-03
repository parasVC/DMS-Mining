import { reqeustServer } from "@/actions/reqeust-server-api";
import LicenseTable from "@/components/core/table/license-table";
import { FIELD_PARAMS } from "@/constant/params";
import { redirect } from "next/navigation";


interface searchParamsProps {
  searchParams: {
    page?: string;
    per_page?: string;
    status?: string;
    [FIELD_PARAMS.CREATED_AT]?: string;
    [FIELD_PARAMS.ASSIGNED_STATUS]?: string
    [FIELD_PARAMS.LICENSE_NUMBER]?: string
  }
}
export default async function ManageLicensepage({ searchParams }: searchParamsProps) {
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

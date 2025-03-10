import { reqeustServer } from "@/actions/reqeust-server-api";
import LicenseListTable from "@/components/core/university/license-list-table";
import { redirect } from "next/navigation";


/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function ManageLicensepage({ searchParams }: any) {
  const { per_page, page,assigned_status, created_at, license_number } = await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  const createdAt = created_at ? created_at : ""
  const assignedStatus = assigned_status ? assigned_status : ""
  const licenseNumber = license_number ? license_number : ""
  let res;
  try {
    res = await reqeustServer({
      url: `license/list?page=${pageVal}&&per_page=${perPage}&created_at=${createdAt}&assigned_status=${assignedStatus}&license_number=${licenseNumber}`,
      method: "GET",
      token: true
    }) 
  } catch (error) {
    if (error.status === 401) {
      redirect("/auth/login");
    }else{
      throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
    }
  }
  
  if (res.statusCode === 401) {
    redirect("/auth/login")
  }

  return <LicenseListTable data={res.data.data} page={pageVal} totalPages={res.data.pages} perPage={perPage}/>;
}

import LicenseListTable from "@/components/core/university/license-list-table";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";
import { redirect } from "next/navigation";


/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function ManageLicensepage({ searchParams }: any) {
  const { per_page, page, assigned_status, created_at, license_number } = await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  const createdAt = created_at ? created_at : ""
  const assignedStatus = assigned_status ? assigned_status : ""
  const licenseNumber = license_number ? license_number : ""
  let res;
  try {
    res = await fetchData({
      url: `license/list?page=${pageVal}&&per_page=${perPage}&created_at=${createdAt}&assigned_status=${assignedStatus}&license_number=${licenseNumber}`,
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

  if (res.statusCode === 401) {
    redirect("/auth/login")
  }

  return <LicenseListTable data={res.data} url="license/list" />;
}

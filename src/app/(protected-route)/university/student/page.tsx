import StudentsListTable from "@/components/core/university/student-list-table";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function TablePage({ searchParams }: any) {
  const { per_page, page, status, student_name, created_at, license_number } =
    await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  const statusVal = status ? status : "";
  const createdAt = created_at ? created_at : ""
  const studentName = student_name ? student_name : ""
  const licenseNumber = license_number ? license_number : ""
  let res;
  try {
    res = await fetchData({
      url: `student/list/data?page=${pageVal}&&per_page=${perPage}&status=${statusVal}&created_at=${createdAt}&student_name=${studentName}&license_number=${licenseNumber}`,
      method: "GET",
      token: true,
    });
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


  return (
    <StudentsListTable
      data={res.data}
      details={res.data}
      url={"student/list/data"}
    />
  );
}

import { reqeustServer } from "@/actions/reqeust-server-api";
import StudentsListTable from "@/components/core/university/student-list-table";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function TablePage({ searchParams }: any) {
  const { per_page, page, status, student_name, created_at, license_number } =
    await searchParams;

  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  const statusVal = status ? status : "";

  const res = await reqeustServer({
    url: `student/list/data?page=${pageVal}&&per_page=${perPage}`,
    method: "POST",
    body: {
      status: statusVal,
      created_at: created_at ? created_at : "",
      student_name: student_name ? student_name : "",
      license_number: license_number ? license_number : "",
    },
    token: true,
  });

  if (res.status === "fail") throw new Error(res.message);

  if (res.statusCode === 401) {
    redirect("/auth/login");
  }

  return (
    <StudentsListTable
      data={res.data.data}
      page={pageVal}
      totalPages={res.data.pages}
      perPage={perPage}
      details={res.data}
    />
  );
}

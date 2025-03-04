import StudentReport from "@/components/core/report/report";
import { reqeustServer } from "@/actions/reqeust-server-api";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function report({ searchParams }: any) {
  const { seed_id, user_id } = await searchParams;

  if (!seed_id || !user_id) { throw new Error("seed number is required") };
  const res = await reqeustServer({
    url: `seed/selected/player/progress?seed_id=${seed_id}&&user_id=${user_id}`,
    method: "GET",
    token: true
  })


  if (res.status === "fail") throw new Error(res.message);


  if (res.statusCode === 401) {
    redirect("/auth/login")
  }
  return (
    <StudentReport reportData ={res.data} seed_id={seed_id} />
  );
}



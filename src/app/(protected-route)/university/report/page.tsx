import StudentReport from "@/components/core/report/report";
import { reqeustServer } from "@/actions/reqeust-server-api";
import { redirect } from "next/navigation";

interface searchParamsProps {
  searchParams: { seed_id: number, user_id: number }
}
export default async function report({ searchParams }: searchParamsProps) {
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
    <StudentReport />
  );
}



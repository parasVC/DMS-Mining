import StudentReport from "@/components/core/report/report";
import { redirect } from "next/navigation";
import axios from "axios";
import { fetchData } from "@/lib/request/fetch-data";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function report({ searchParams }: any) {
  const { seed_id, user_id, student_name } = await searchParams;

  if (!seed_id || !user_id) { throw new Error("seed number is required") };

  let res;
  try {
    res = await fetchData({
      url: `seed/selected/player/progress?seed_id=${seed_id}&&user_id=${user_id}`,
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
  return (
    <StudentReport reportData={res.data} seed_id={seed_id} student_name={student_name} user_id={user_id} />
  );
}



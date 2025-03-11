import React from "react";
import ProfilePage from "@/components/core/university/view-student";
import { redirect } from "next/navigation";
import axios from "axios";
import { fetchData } from "@/lib/request/fetch-data";
/* eslint-disable @typescript-eslint/no-explicit-any */
const page = async ({ params }: any) => {
  const { studentId } = await params;

  let res;
  try {
    res = await fetchData({
      url: `student/retrieve?student_id=${studentId}`,
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
  return <ProfilePage userData={res.data} />;
};

export default page;

import LicenseHistoryTable from "@/components/core/admin/license-history-table";
import { fetchData } from "@/lib/request/fetch-data";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const LicenseHistoryPage = async ({ searchParams }: any) => {
  const { university_id, page, per_page, created_at, status, university_name } =
    await searchParams;

  if (!university_id) {
    throw new Error("university id is required");
  }
  const perPage = per_page ? Number(per_page) : 10;
  const pageVal = page ? Number(page) : 1;
  const statusVal = status ? status : "";
  const universityId = university_id ? university_id : "";
  const createdAt = created_at ? created_at : "";
  let res;

  try {
    res = await fetchData({
      url: `license/client/list/?page=${pageVal}&per_page=${perPage}&client_id=${universityId}&status=${statusVal}&created_at=${createdAt}`,
      method: "GET",
      token: true,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if ( error.response.status === 401) {
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
    <LicenseHistoryTable
      data={res.data}
      university_id={university_id}
      university_name={university_name}
      url={"license/client/list"}
      query= {{client_id: universityId}}
    />
  );
};

export default LicenseHistoryPage;

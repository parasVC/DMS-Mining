import DashboardPage from '@/components/core/dashboard/dashboard'
import { fetchData } from '@/lib/request/fetch-data';
import React from 'react';
import axios from "axios";
import { redirect } from 'next/navigation';


export default async function dashboard(){
  
  let res;
  try {
    res = await fetchData({
      url: "client/dashboard",
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
    <div><DashboardPage data={res.data} role='university'/></div>
  )
}

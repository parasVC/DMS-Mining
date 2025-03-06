import React from 'react'
import { reqeustServer } from "@/actions/reqeust-server-api";
import ViewClient from '@/components/core/admin/view-client';
import { redirect } from 'next/navigation';

/* eslint-disable @typescript-eslint/no-explicit-any */
const page = async ({ params }: any) => {
  const {id} = await params;
  const res = await reqeustServer({
    url: `client/retrieve?client_id=${id}`,
    method : "GET",
    token: true
  })

  if (res.statusCode === 401) {
    redirect("/auth/login")
  }

  return (
    <ViewClient userData={res.data} />
  )
}

export default page
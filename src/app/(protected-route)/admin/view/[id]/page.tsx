import React from 'react'
import { reqeustServer } from "@/actions/reqeust-server-api";
import ViewClient from '@/components/core/admin/view-client';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { id: string };
}
const page = async ({ params }: PageProps) => {

  const res = await reqeustServer<Response>({
    url: `client/retrieve?client_id=${params.id}`,
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
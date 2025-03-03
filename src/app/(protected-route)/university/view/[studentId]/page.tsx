import React from 'react'
import { reqeustServer } from '@/actions/reqeust-server-api';
import ProfilePage from '@/components/core/university/view-student';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { studentId: string };
}
const page = async ({ params }: PageProps) => {
  const { studentId } = await params
  const res = await reqeustServer({
    url: `student/retrieve?student_id=${studentId}`,
    method:"GET",
    token : true
  })

  
  

  if (res.statusCode === 401) {
    redirect("/auth/login")
  }
  return (
    <ProfilePage userData={res.data} />
  )
}

export default page
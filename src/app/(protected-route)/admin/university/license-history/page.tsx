import { reqeustServer } from '@/actions/reqeust-server-api'
import LicenseHistoryTable from '@/components/core/admin/license-history-table'
import { redirect } from 'next/navigation'
import React from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
const LicenseHistoryPage = async ({ searchParams }: any) => {
    const { university_id, page, per_page, created_at, status } = await searchParams;
    if (!university_id) { throw new Error("university id is required") };
    const perPage = per_page ? Number(per_page) : 10;
    const pageVal = page ? Number(page) : 1;
    const statusVal = status ? status : "";

    const res = await reqeustServer({
        url: `license/client/list/?page=${pageVal}&per_page=${perPage}&client_id=${university_id}`,
        method: "POST",
        body: {
            status: statusVal,
            created_at: created_at ? created_at : "",
        },
        token: true
    })

    if (res.statusCode === 401) {
        redirect("/auth/login")
    }

    return (
        <LicenseHistoryTable
            data={res.data.data}
            page={pageVal}
            total={res.data.total}
            totalPages={res.data.pages}
            perPage={perPage}
            university_id={university_id}
        />
    )
}

export default LicenseHistoryPage
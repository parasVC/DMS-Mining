'use client'

import { reqeustServer } from '@/actions/reqeust-server-api';
import { Card, CardTitle } from '@/components/ui/card'
import { CalendarDays, CircleDollarSign } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from '../loader/loader';
import { UserFieldProps } from '@/types/user-field';
import { useToast } from '@/hooks/use-toast';

interface SeedListProps {
    seed_id: number;
    last_login: string;
    profit_margin: string;
  }
const StudentSeedList = ({userData} : UserFieldProps) => {
    const {toast} = useToast();
    const router = useRouter();
    const [seedList, setSeedList] = useState<SeedListProps[]>([]);
    const [isloading, setIsLoading] = useState(false);
    const fetchSeedList = async () => {
        try {
            setIsLoading(true)
            const res = await reqeustServer({
                url : `seed/student/selected?user_id=${userData.id}`,
                method : "GET",
                token : true
            })
            if(res.status === "success" && res.data.length > 0) {
                setSeedList(res.data)
                
            }else{
                toast({
                    variant: "destructive",
                    title: "No seeds found",
                    description: res.message,
                });
            }
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request."
            })
        } finally{
            setIsLoading(false)
        }   
    }
    useEffect(() => {
        fetchSeedList()
    },[])
    return (
        <>
            <div>
                <div className="text-lg font-semibold">Reports</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {seedList.length > 0 ? (seedList.map((report) => (
                    <Card onClick={() => { router.push(`/university/report?seed_id=${report.seed_id}&user_id=${userData.id}&student_name=${userData.first_name} ${userData.last_name}`) }} key={report.seed_id} className="p-5 gap-3 cursor-pointer rounded-sm">
                        <CardTitle className="text-xl font-medium">{report.seed_id}</CardTitle>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                            <CalendarDays className="text-blue-500" size={16} />
                            <span>Last Login:</span>
                            <span className="font-medium">{report.last_login}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                            <CircleDollarSign className="text-blue-500" size={16} />
                            <span>Profit Margin:</span>
                            <span className="font-medium">{report.profit_margin}</span>
                        </div>
                    </Card>
                ))): <div>No seed found</div>}
                {isloading && (
                    <div><Loader/></div>
                )}
            </div>
        </>
    )
}

export default StudentSeedList
import { reqeustServer } from '@/actions/reqeust-server-api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ParamsType {
    student_name?: string;
    license_number?: number;
    created_at?: Date;
    status?:string;
    seed_id?: number;
    student_id?: number;
    page?:number;
  }
const DownloadFile = ({ url, params }: { url: string, params: ParamsType }) => {
    const { toast } = useToast();
    const router = useRouter();
    const queryString = new URLSearchParams(
        Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
        )
    ).toString();
    

    const downloadFile = async () => {
        const res = await reqeustServer({
            url: `${url}?${queryString}`,
            method: "GET",
            token: true
        })
        if (res.status === "success") {
            const link = document.createElement("a");
            link.href = res.data;
            link.setAttribute("download", "");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast({
                title: "File Downloaded Successfully",
                description: res.message,
            });
            router.refresh();
            return;
        } else {
            toast({
                variant: "destructive",
                title: "Download failed",
                description: res.message,
            });
        }
    }

    const handleDownloadFile = async () => {
        try {
            await downloadFile();
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    }
    return (
        <div>
            <Button
                className="p-3"
                variant={"outline"}
                onClick={() => {
                    handleDownloadFile();
                }}

            > <Download />
                <span className="text-sm">Download</span></Button>
        </div>
    )
}

export default DownloadFile

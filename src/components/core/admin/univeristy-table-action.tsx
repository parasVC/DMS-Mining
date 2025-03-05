import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import AssignLicense from './assign-license'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye, FileClock, MoreHorizontal, Trash } from 'lucide-react'
import { useAdminActions } from '@/hooks/use-admin-actions'
import { useRouter } from 'next/navigation'

const UniveristyAableAction = ({ id }: { id: number }) => {
    const router = useRouter()
    const { deleteClientAction } = useAdminActions()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Button onClick={() => router.push(`/admin/university/view/${id}`)} variant={"ghost"} className="p-2 w-full flex gap-3 justify-start items-center"><Eye size={16} />
                    View
                </Button>
                <AssignLicense clientId={id} />
                <Button onClick={() => router.push(`/admin/university/license-history?university_id=${id}`)} variant={"ghost"} className="p-2 w-full flex gap-3 justify-start items-center"><FileClock size={16} />
                    License History
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"ghost"} className="p-2 w-full flex gap-3 justify-start items-center"> <Trash size={16} />Delete University</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Remove client</DialogTitle>
                            <DialogDescription>
                                Are you sure for remove client
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={() => deleteClientAction(id)}>Yes</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant={"secondary"}>No</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UniveristyAableAction
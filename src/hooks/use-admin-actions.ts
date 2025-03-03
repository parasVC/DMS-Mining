import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { reqeustServer } from "@/actions/reqeust-server-api";
export const useAdminActions = () => {
  const router = useRouter();
  const { toast } = useToast();
  const deleteClientAction = async (id: number) => {

    const res = await reqeustServer({
      url: `client/delete?client_id=${id}`,
      method : "DELETE",
      token: true
    });
    
    if (res.status === "fail") {
      toast({
        title: "Error",
        variant: "destructive",
        description: res.message,
      });
      return;
    }
    toast({
      title: "Success",
      description: res.message
    });
    router.refresh();
  };



  return {
    deleteClientAction
  };
};

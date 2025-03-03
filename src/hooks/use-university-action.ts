import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { reqeustServer } from "@/actions/reqeust-server-api";
import { API_PARAMS } from "@/constant/api-params";
export const useUniversityActions = () => {
  const router = useRouter();
  const { toast } = useToast();
  const assignLicense = async (id: number) => {

    const res = await reqeustServer({
      url: `license/student/assign?${API_PARAMS.STUDENT_ID}=${id}`,
      method : "POST",
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

  const removeLicense = async (license_number: string) => {

    const res = await reqeustServer({
      url: `license/delete?${API_PARAMS.LICENSE_NUMBER}=${license_number}`,
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
    assignLicense,
    removeLicense
  };
};

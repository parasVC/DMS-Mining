"use server";
import { fetchData } from "@/lib/request/fetch-data";
import { FetcherProps } from "@/lib/request/type";

export async function reqeustServer({
    url,
    method = "GET",
    token = false,
    body = null,
    options = {},
    headerOptions = {},
}: FetcherProps) {
    try {
        
        const res = await fetchData({
            url,
            method,
            token,
            body,
            options,
            headerOptions
        });
        
        return res;
        
    } catch (error: any) {
        if(error?.status === 401){
            return {
                statusCode : 401
            }
        }
        throw new Error("Something went wrong");
    }
}

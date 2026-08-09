import {api} from "@/lib/axios";

export async function getDashboard(){
    const response = await api.get(
        "/dashboard"
    );
    return response.data;
};

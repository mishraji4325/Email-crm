import { api } from "@/lib/axios";

export async function registerUser(data:{
    name: string,
    email: string,
    password:string,
}){
    const response = await api.post('/auth/register', data);

    return response.data;
};

export async function loginUser(data:{
    email: string,
    password: string,
}){
    const response = await api.post('/auth/login', data);

    return response.data;
};

export async function updateProfile(data: {
    name: string;
    email: string;
}) {

    const response =
        await api.patch(
            "/auth/profile",
            data
        );

    return response.data;
}


export async function deleteAccount() {

    const response =
        await api.delete(
            "/auth/account"
        );

    return response.data;
}


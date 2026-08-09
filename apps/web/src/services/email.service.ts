import { api } from "@/lib/axios";

export async function getLeadEmails(leadId:string){
    const response = await api.get(`/emails/lead/${leadId}`
    );
    return response.data;
};

export async function updateEmail(id:string, Content:string){
    const response = await api.patch(
        `/emails/${id}`,
        {
            Content
        }
    );
    return response.data;
}

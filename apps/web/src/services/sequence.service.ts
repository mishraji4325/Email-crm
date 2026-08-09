import {api} from "@/lib/axios";

export async function createSequence(name:string){
    const response = await api.post("/sequence",{
        name
    })
    return response.data;
}

export async function getSequences(){
    const response = await api.get("/sequence");

    return response.data;
}

export async function getSequence(id:string){
    const response = await api.get(`/sequence/${id}`);
    return response.data;
}

export async function assignSequence(sequenceId:string, leadId:string){
    const response = await api.post(`/sequence/${sequenceId}/assign`,
    {
        leadId
    });
    return response.data
}

export async function createStep(sequenceId:string,
    data:{
        dayOffset:number,
        subject:string,
        body:string,
    }
){
    const response = await api.post(`/sequence/${sequenceId}/steps`,data);
    return response.data;
}

export async function updateStep(stepId:string, data:any){
    const response = await api.patch(`/sequence/steps/${stepId}`,data);

    return response.data;
}

export async function deleteStep(stepId:string){
    const response = await api.delete(`/sequence/steps/${stepId}`);
    return response.data;
}

export async function getSequenceLeads(sequenceId:string){
    const response = await  api.get(`/sequence/${sequenceId}/leads`);

    return response.data;
}

export async function assignLead(sequenceId:string, leadId:string){
    const response = await api.post(`/sequence/${sequenceId}/assign`,{
        leadId,
    });

    return response.data;
}

export async function removeLead( sequenceId: string, leadId: string ) {
    const response =
        await api.delete(
            `/sequence/${sequenceId}/assign/${leadId}`
        );

    return response.data;

}
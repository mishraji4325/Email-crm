import { api } from "@/lib/axios";

export async function getLeads(
  search?:string,
  status?:string,
) {

  const response =
    await api.get("/leads", {params:{search, status}});
  return response.data;
};

export async function getLead(id:string){
  const response = await api.get(`/leads/${id}`)
  return response.data;
};

export async function updateLeadStatus(id:string, status:string){
  const response = await api.patch(`/leads/${id}`, {status});
  return response.data;
};

export async function getLeadActivities(leadId:string){
  const response = await api.get(`/leads/${leadId}/activities`);
  return response.data;
}

export async function bulkGenerate(leadIds:string[]){
  const response = await api.post("/generate/bulk",{
    leadIds
  })
  return response.data;
}

export async function bulkSend(leadIds:string[]){
  const response = await api.post("/send/bulk",{
    leadIds
  });
  return response.data;
}
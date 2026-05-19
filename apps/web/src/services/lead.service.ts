import { api } from "@/lib/axios";

export async function getLeads() {

  const response =
    await api.get("/leads");

  return response.data;
};

export async function getLead(id:string){

  const response = await api.get(`/leads/${id}`)

  return response.data;
};

export async function updateLeadStatus(id:string, status:string){
  const response = await api.patch(`/leads/${id}`, {status});

  return response.data;
}
import { api } from "@/lib/axios";

export async function importLeads(
  leads: any[] 
) {

  const response =
    await api.post("/import", leads);

  return response.data;
}
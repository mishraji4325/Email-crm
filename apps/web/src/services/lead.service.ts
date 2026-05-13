import { api } from "@/lib/axios";

export async function getLeads() {

  const response =
    await api.get("/leads");

  return response.data;
};
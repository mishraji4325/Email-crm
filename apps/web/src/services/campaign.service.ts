import {api} from '@/lib/axios';

export async function createCampaign(name:string){
    const response = await api.post('/campaigns', {name});
    
    return response.data;
};

export async function getCampaign(id:string){
  const response = await api.get(`/campaigns/${id}`);
  return response.data
}

export async function deleteCampaign(id:string){
  const response = await api.delete(`/campaigns/${id}`);
  return response.data
}
  
export async function getCampaigns() {

  const response = await api.get("/campaigns");

  return response.data;

};

export async function getCampaignAnalytics(campaignId:string){
    const response = await api.get(`/campaigns/${campaignId}/analytics`);

    return response.data
    
};

export async function assignLeadToCampaign(campaignId:string, leadId:string){
  const response = await api.post(`/campaigns/${campaignId}/leads`,
    {
      leadIds:[leadId]
    }
  );
  return response.data
}

export async function generateCampaignEmails(campaignId:string){
  const response = await api.post(`/campaigns/${campaignId}/generate`);

  return response.data
}
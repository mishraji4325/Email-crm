import {api} from '@/lib/axios';

export async function getAnalytics(){
    const response = await api.get('/analytics');

    return response.data;
};

export async function getFunnelAnalytics(){
    const response = await api.get('/analytics/funnel');

    return response.data;
};
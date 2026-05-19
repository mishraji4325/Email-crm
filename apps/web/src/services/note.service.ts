import {api} from '@/lib/axios';

export async function createNote(
    data:any
){
    const response = await api.post('/notes', data);

    return response.data;
}
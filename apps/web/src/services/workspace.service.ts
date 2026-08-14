import {api} from "@/lib/axios";

export async function getWorkspaces(){
    const response = await api.get('/workspace');

    return response.data
}

export async function createWorkspace(name:string){
    const response = await api.post('/workspace',
        {name});
    return response.data
}

export async function getWorkspace(id:string){
    const response = await api.get(`/workspace/${id}`);
    return response.data
}

export async function inviteMember(workspaceId:string, userId:string){
    const response = await api.post(`/workspace/${workspaceId}/members`,{
        userId
    });
    return response.data;
}

export async function removeMember(workspaceId:string, userId:string){
    const response = await api.delete(`/workspace/${workspaceId}/members/${userId}`)
    return response.data;
}

export async function getAvailableUsers(workspaceId:string){
    const response = await api.get(`/workspace/${workspaceId}/available-users`);

    return response.data;

}

export async function updateWorkspace( workspaceId: string, name: string) {
    const response = await api.put(`/workspace/${workspaceId}`,
            {
                name,
            }
        );
    return response.data;
}

export async function deleteWorkspace( workspaceId: string ) {
    const response = await api.delete( `/workspace/${workspaceId}` );
    return response.data;
}
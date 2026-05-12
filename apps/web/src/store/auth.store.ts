import { create } from 'zustand';

interface User {
    id: string,
    name: string, 
    email: string,
}

interface AuthStore {
    user: User | null,
    token: string | null,

    setAuth:(
        user:User,
        token:string
    )=> void,

    logout:()=>void
}

export const useAuthStore = create<AuthStore>((set) => ({
    user:null,
    token:null,

    setAuth:(user, token) => set({user, token}),

    logout:() => set({user:null, token:null}),
}));
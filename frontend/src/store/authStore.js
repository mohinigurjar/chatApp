import { create } from "zustand";
import { loginUser, logout, getUserProfile } from "../services/api.js"

export const useAuthStore = create((set) => ({
    currentUser: null,
    loading: true,
    initialized: false,

    checkAuth: async() => {
        
        try{
            console.log("checkAuth Started");
            const res = await getUserProfile();
            console.log("Checkauth response: ", res.data.user);
            set({currentUser: res.data.user, loading: false})
        }catch(error){
            set({currentUser: null, loading: false})
        }finally{
            console.log("Auth finally working");
            set({loading: false, initialized: true})
            // console.log("initialized after finally", initialized);
        }
    },

    login: async(data) => {
        await loginUser(data);
        const res = await getUserProfile();
        set({currentUser: res.data.user});
    },

    logout: async() => {
        await logout();
        set({currentUser: null});
    }

}));
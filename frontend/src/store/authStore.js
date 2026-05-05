import { create } from "zustand";
import { loginUser, logout, getUserProfile, editUserProfile, changePassword } from "../services/api.js"

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
        try{
            await loginUser(data);
            const res = await getUserProfile();
            console.log("from authstore: ", res.data.user)
            set({currentUser: res.data.user});
        }catch(error){
            console.log("Login failed ", error);
            throw error;
        }
    },

    logout: async() => {
        await logout();
        set({currentUser: null});
    },

    editUsername: async(newname) => {
        try{
            const res = await editUserProfile(newname);
            set((state) => ({
                currentUser: {
                    ...state.currentUser,
                    username: res.data.user.username
                }
            }));
        }catch(error){
            console.log("Error updating profile", error)
            throw error;
        }
    },

    editPassword: async(oldPassword, newPassword) => {
        try{
            const res = await changePassword({oldPassword, newPassword});
            console.log(res.data.user);
            set((state) => ({
                currentUser: {
                    ...state.currentUser,
                    password: res.data.user.password
                }
            }));
        }catch(error){
            console.log("Error updating password: ", error);
            throw error;
        }
    }

}));
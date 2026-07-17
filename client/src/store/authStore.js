import {create} from "zustand";

const useAuthStore = create((set)=>({
    //readd the from localstorage on startup
    //so the user stays logged in after refersh
    token:localStorage.getItem("nexus_token")||null,
    user:JSON.parse(localStorage.getItem("nexus_user"))||null,

    //called after successful login or register
    login:(token,user)=>{
        localStorage.setItem("nexus_token",token);
        localStorage.setItem("nexus_user", JSON.stringify(user));
        set({token,user});
    },

    //called when user clicks logout
    logout:()=>{
        localStorage.removeItem("nexus_token");
        localStorage.removeItem("nexus_user");
        set({token:null,user:null});
    },
}));

export default userAuthStore;
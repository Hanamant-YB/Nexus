import {create} from "zustand";

const useAuthStore = create((set)=>({
    //readd the from localstorage on startup
    //so the user stays logged in after refersh
    token:localStorage.getItem("nexus_token")||null,
    user:JSON.parse(localStorage.getItem("nexus_user"))||null,

    //called
}));
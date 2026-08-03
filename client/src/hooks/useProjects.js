import { useState, useEffect } from "react";
import api from "../api/axios";

const useProjects = () => {
    const[projects, setProjects] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error,setError] = useState("");

    // fetch the all projects on mount
    useEffect(()=>{
        const fetchProjects = async() =>{
            try{
                const res = await api.get("/projects");
                setProjects(res.data.data);
            }catch(err){
                setError("Failed to load projects");
            }finally{
                setLoading(false);
            }
        };
        fetchProjects();
    },[]);

    //create a new project
    const createProject = async(name,description)=>{
        try{
            const res = await api.post("/projects",{
                name,
                description
            });
            setProjects((prev)=>[res.data.data,...prev]);
            return res.data.data;
        }catch(err){
            throw new Error(err.response?.data?.message || "Failed to create project");

        }
    };
    return {projects,loading, error, createProject};
}

export default useProjects;
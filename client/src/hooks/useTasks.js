import { useState, useEffect } from "react";
import {io} from "socket.io-client";
import api from "../api/axios";

//connect to socket server once
const socket = io("http://localhost:5000",{
    transports:["websocket"],
    autoConnect:false
});

const useTask = (projectId) =>{
    const[tasks,setTasks] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        if(!projectId){
            return;
        }
        //fetch existing tasks from backend
        const fetchTasks = async()=>{
            try{
                const res = await api.get(`/tasks?projectId=${projectId}`);
                setTasks(res.data.data)
            }catch(err){
                console.error("Failed to fetch tasks:",err);
            }finally{
                setLoading(false);
            }
        };
        fetchTasks();

        // connect socket and join project room
        socket.connect();
        socket.emit("join:project",projectId);

        //Listen for real-time events
        socket.on("task:created",(task)=>{
            setTasks((prev)=>{
                //Avoid duplicates
                if(prev.find((t)=> t._id === task._id)){
                    return prev;
                }
                return[task, ...prev]
            });
        });

        socket.on("task:updated",(updated)=>{
            setTasks((prev)=>
                prev.map((t)=> (t._id === updated._id? updated:t))
            );
        });
        
        socket.on("task:deleted",({taskId})=>{
            setTask((prev)=> prev.filter((t)=>t._id !== taskId));
        });
        
        //cleanup when leaving the board
        return ()=>{
            socket.emit("leave:project",projectId);
            socket.off("task:created");
            socket.off("task:updated");
            socket.off("task:deleted");
            socket.disconnect();
        }
    },[projectId]);

    //updated task status(called on drag and drop)
    const updateTaskStatus = async(taskId,status)=>{
        try{
            await api.patch(`/tasks/${taskId}`,{status})
            //socket event will update the UI automatically
        } catch(err){
            console.error("Failed to update task:",err)
        }
    };

    //create AI task
    const createAiTask = async(title,description,projectId)=>{
        const res = await api.post("/tasks/create-intelligent",{
            title,
            description,
            projectId,
        });
        res.data.data;
    };

    return{tasks,loading,updateTaskStatus,createAiTask};
};

export default useTasks;
const{createTask,getTasks,getTaskById,updateTask,deleteTask} = require("../services/taskService");

//post for task create
const create = async(req,res,next)=>{
    try{
        const task = await createTask(req.body,req.user.id,req);
        res.status(201).json({
            success:true,
            data:task,
        });
    }catch(err){
        next(err);
    }
};

//get for all task 
const getTasksAll = async(req,res,next)=>{
    try{
        const tasks = await getTasks(req.query,req.user.id);
        res.status(200).json({
            success:true,
            count:tasks.length,
            data:tasks
        });
    }catch(err){
        next(err);
    }
};

//get one task by :id
const getOneTaskById  =  async(req,res,next)=>{
    try{
        const task = await getTaskById(req.params.id,req.user.id);
        res.status(200).json({
            success:true,
            data:task,
        });    
    }catch(err){
        next(err);
    }
};

//patch task:id/updates/:userId
const taskUpdate = async(req,res,next)=>{
    try{
        const task = await updateTask(req.params.id,req.body,req.user.id,req);
        res.status(200).json({
            success:true,
            data:task,
        });
    }catch(err){
        next(err);
    }
};

//delete task:id
const taskDelete = async(req,res,next)=>{
    try{
        const task = await deleteTask(req.params.id,req);
        res.status(200).json({
            success:true,
            message:"Task is deleted successfully",
        });
    }catch(err){
        next(err);
    }
};

module.exports = {create,getTasksAll,getOneTaskById,taskUpdate,taskDelete};
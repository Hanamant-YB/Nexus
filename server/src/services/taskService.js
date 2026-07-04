const Task = require("../models/Task");
const Project = require("../models/Project");
const {AppError} = require("../middlewares/errorHandler");

//create the task
const createTask = async(taskData,userId)=>{
    const {title,description,priority,assignedTo,dueDate,projectId} = taskData;

//check the project is exists or not
const project = await Project.findById(projectId);
if(!project){
    throw new AppError("Project not found",404);
}
//task create
const task = await Task.create({
    title,
    description,
    priority,
    assignedTo,
    dueDate,
    projectId,
    createdBy:userId,
});
return task;
};

//get all tasks related to project - with optional filters
const getTasks = async(query,userId)=>{
    const {projectId,status,priority,assignedTo} = query;
    
    if(!projectId){
        throw new AppError("projectId is required",400);
    }

    const project = await Project.findById(projectId);
    if(!project){
        throw new AppError("Project not found",404);
    }
    //check the user is member or not of this project
    const isMember = project.members.some(
        (m)=> m.userId.toString() === userId.toString()
    )

    if(!isMember){
        throw new AppError("Access denied",403);
    }

    //filter object

    const filter = {projectId};
    if(status)filter.status = status;
    if(priority)filter.priority = priority;
    if(assignedTo)filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter)
    .populate("assignedTo","name email")
    .populate("createdBy","name email")
    .sort({createdAt: -1});

    return tasks
 };

 //get one task by id
const getTaskById = async(taskId,userId)=>{
    const task = await Task.findById(taskId)
    .populate("assignedTo","name email")
    .populate("createdBy","name email")
    .populate("projectId","name");

    if(!task){
        throw new AppError("task not found",404);
    }

    //check the user belongs this project or not
    const project = await Project.findById(task.projectId);

    const isMember = project.members.some(
        (m)=>m.userId.toString() === userId.toString()
    );
    
    if(!isMember){
        throw new AppError("Access denied",403);
    }

    return task;


};


//update a task

const updateTask = async(taskId,updates,userId)=>{
  const task = await Task.findById(taskId);
  if(!task){
    throw new AppError("Task not found",404);
  }
   //only allow safe fields to be updated 
  const allowed = [
    "title","description","status",
    "priority","assignedTo","dueDate",
    "subTasks"
  ];

  allowed.forEach((field)=>{
    if(updates[field]!==undefined){
        task[field] = updates[field];
    }
  });

  await task.save();
  return task;

};

//delete a task

const deleteTask = async(taskId) =>{
    const task = await Task.findById(taskId);
    if(!task){
        throw new AppError("Task not found",404);
    }
    await task.deleteOne();
    return {message:"Task deleted successfully"};
};

module.exports = {
    createTask,getTasks,getTaskById,updateTask,deleteTask,
};
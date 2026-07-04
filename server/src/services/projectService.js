const Project = require("../models/Project");
const Task = require("../models/Task");
const{AppError} = require("../middlewares/errorHandler");

//create a new project

const createProject = async(name,description,userId)=>{
    const project = await Project.create(
        {
            name,
            description,
            ownerId:userId,
            members:[{userId,role:"owner"}],
        }
    );
    return project;
};

// get all projects for a user

const getAllProjects = async(userId)=>{
    // find every project where this user is in the member 
    const projects = await Project.find({
        "members.userId":userId
    }).sort(
        { createdAt:-1 }//newest first
    );
    return projects;
};

//get a single project by id with full task details

const getProjectById = async(projectId,userId)=>{
    const project = await Project.findById(projectId).populate("members.userId","name email");

    if(!project){
        throw new AppError("Project not found",404);
    }
    
    const isMember = project.members.some(
        (m)=> m.userId._id.toString() === userId.toString()
    );

    if(!isMember){
        throw new AppError("You do not have access to this project",403);
    }
    const tasks = await Task.find({
        projectId,
    }).populate("assignedTo","name email");

    return {project,tasks};
};

module.exports = {createProject,getAllProjects,getProjectById};
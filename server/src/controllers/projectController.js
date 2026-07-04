const {createProject,getAllProjects,getProjectById} = require("../services/projectService");

//post create project
const create = async(req,res,next)=>{
    try{
        const{name,description} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Project name is required"
            });
        }
        const project = await createProject(name,description,req.user.id);
        res.status(201).json({
            success:true,
            message:"Project created",
            project:project,
        });
    }catch(err){
        next(err);
    }
};

// Get all project for particular user loged in
const  getAll = async(req,res,next)=>{
    try{
        const projects = await getAllProjects(req.user.id);
        
        res.status(200).json({
            success:true,
            count:projects.length,
            data:projects
        });
    }catch(err){
        next(err);
    }
};

//Get full task of specified project
const getOneProject = async(req,res,next)=>{
    try{
        const project = await getProjectById(req.params.id,req.user.id);
        
        res.status(200).json({
            success:true,
            data:project,
        });
    }catch(err){
        next(err);
    }
};

module.exports = {create,getAll,getOneProject};
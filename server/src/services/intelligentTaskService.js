const Task = require("../models/Task");
const Project = require("../models/Project");
const {analyzeTask} = require("./aiService");
const {AppError} = require("../middlewares/errorHandler");

const createIntelligentTask = async(taskData,userId)=>{
    const{title,description,priority,assignedTo,
          dueDate,projectId} = taskData;
    
    //confirm project exists
    const project = await Project.findById(projectId);
    if(!project){
        throw new AppError("project not found",404);
    }

    //call gemini
    console.log("calling gemini for task",title);
    const aiResults = await analyzeTask(title,description);
    console.log("Gemini results",aiResults);

    //combine user input + AI analysis into one task
    const task = await Task.create(
        {
            title,
            description:description || "",
            priority:priority ||"medium",
            assignedTo:assignedTo || null,
            dueDate:dueDate || null,
            projectId,
            createdBy:userId,


            //AI fields from gemini
            isAiGenerated:true,
            difficultyRating:aiResults.difficulty,
            aiTags:aiResults.tags,
            subTasks:aiResults.subTasks,
            estimatedHours:aiResults.estimatedHours,
        });
    return task;
};

module.exports = {createIntelligentTask};
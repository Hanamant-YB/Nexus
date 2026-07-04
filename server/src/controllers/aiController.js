const{createIntelligentTask} =  require("../services/intelligentTaskService");

//post/api/tasks/create-ai
const createIntelligent = async(req,res,next)=>{
    try{
        const{
            title,
            description,
            priority,
            assignedTo,
            dueDate,
            projectId
        } = req.body;

        if(!title){
            return res.status(400).json({
                success:false,
                message:"Title is required",
            });
        }

        if(!projectId){
            return res.status(400).json({
                success:false,
                message:"Project ID is required",
            });
        }

        const task = await createIntelligentTask(req.body,req.user.id);
        
        res.status(200).json({
            success:true,
            message:"AI task created successfully",
            data:task,
        });
    }catch(err){
        next(err);
    }
};

module.exports = {createIntelligent};
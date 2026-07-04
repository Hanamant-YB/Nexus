const Project  =  require("../models/Project");
const {AppError} = require("../middlewares/errorHandler");

const checkRole = (...allowedRoles) =>{
    return async (req,res,next)=>{
        try{
            const projectId =  req.body.projectId || req.params.projectId || req.query.projectId;
            if(!projectId){
                return next(new AppError("project ID is required",400));
            }

            const project = await Project.findById(projectId);
            if(!project){
                return next(new AppError("project not found",404));
            }
            
            const member = await project.members.find(
                (m)=> m.userId._id.toString() === req.user.id.toString()
            );
            if(!member){
                return next(new AppError("You are not a member of this project",403));
            }
            // check the role is in the allowed list
            if(!allowedRoles.includes(member.role)){
                return next(
                    new AppError(
                     `Access denied.Required role:${allowedRoles.join(" or ")}`,403
                    )
                );
            }
            //attach role to request
            req.userProjectRole = member.role;
            next();
        }catch(err){
            next(err);
        }
    };
};

module.exports = checkRole;
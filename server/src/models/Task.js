const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Task title is required"],
            trim:true,
        },
        description:{
            type:String,
            default:"",
            trim:true,
        },
        status:{
            type:String,
            enum:["todo","in-progress","review","done"],
            default:"todo"
        },    
        projectId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
            required:[true,"Project ID is required"],
        },
        assignedTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null,
        },
        dueDate:{
            type:Date,
            default:null,
        },
        priority:{
            type:String,
            enum:["low","medium","high","critical"],
            default:"medium",
        },     
        //AI fields - filled by phase 5
        isAiGenerated:{
            type:Boolean,
            default:false,

        },
        aiTags:{
            type:[String],
            default:[],
        },
        difficultyRating:{
            type:Number,
            min:1,
            max:5,
            default:null,
        },
        subTasks:{
            type:[String],
            default:[],
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("task",taskSchema);
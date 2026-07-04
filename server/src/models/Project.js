const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    role:{
        type:String,
        enum:["owner","admin","member"],
        default:"member",
    },
});

const projectSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,"Project name is required"],
        trim:true,
    },
    description:{
        type:String,
        default:"",
        trim:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    members:[memberSchema],
    
    },
    {
        timestamps:true,
    }
);



module.exports = mongoose.model("Project",projectSchema);
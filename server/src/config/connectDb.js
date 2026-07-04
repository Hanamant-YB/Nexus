const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL;

const connectDb = async() =>{
    try{
        await mongoose.connect(mongoURL);
        console.log("✅ connected to MongoDB")
    }catch(err){
        console.log("🚫 connection failed",err);
        process.exit(1);
    }
    
} 
// console.log(db)
module.exports = connectDb;
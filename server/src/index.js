const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const { errorHandler } = require("./middlewares/errorHandler");
const authRoute = require("./routes/authRoute");
const projectRoutes = require("./routes/projectsRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const logrequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleDateString()}] Requested api ${req.originalUrl}`);
    console.log(req.body);
    next();
}
app.use(logrequest);
app.use("/api/auth",authRoute);
app.use("/api",projectRoutes);
app.use("/api",taskRoutes);
app.get("/",(req,res)=>{
    res.send("server is running and db is connected!")
});

app.use(errorHandler);

const startServer = async ()=>{
    try{
        await connectDb();
        app.listen(PORT,()=>{
            console.log("🚀server is running in port "+PORT);
        })
    }catch(err){
        console.log("failed to start the server",err);
    }
}

startServer();
// app.listen(3000,()=>{
//     console.log("server is running in port 3000");
// });
const {registerUser,loginUser} = require("../services/authService");

//POST register
const register = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;

        //Basic validation
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Name, email and password are required"
            });
        }

        const user = await registerUser(name,email,password);

        res.status(201).json({
            success:true,
            message:"Account created successfully",
            data:user,
        });

    }catch(err){
        next(err);
    }
};

//POST Login 
const login = async(req,res,next)=>{
    try{
            
        const{email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password are required",
            });
        }

        const data = await loginUser(email,password);
        res.status(200).json({
            success:true,
            message:"Login successful",
            data,
        });
    }catch(err){
        next(err);
    }    
};

module.exports = {register,login};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {AppError} = require("../middlewares/errorHandler");

// Registering User
const registerUser = async(name,email,password)=>{
    const existing = await User.findOne({email})

    if(existing){
        throw new AppError("Email is already registered", 409);
    }

    // const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password,
    });

    return{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    };
};

// Login
const loginUser = async(email,password)=>{
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new AppError("Invalid email or password",401)
    }

    // const isMatch = await bcrypt.compare(password,user.password);
    const isMatch = await user.comparePassword(password);  
    if(!isMatch){
        throw new AppError("Invalid email or password",401);
    }

    const token = jwt.sign(
        {
            id:user._id,
            role:user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d",
        }
    );

    return{
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        },
    };
};

module.exports ={ registerUser,loginUser};
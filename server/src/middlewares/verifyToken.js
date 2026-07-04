const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");

const jwtAuthenticationVerify = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            throw new AppError("token not found",401);
        }
        const jwtToken = token.split(" ")[1];
        if(!jwtToken){
            throw new AppError("Unauthorized",401);
        }
        const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;
        next();
    }catch(err){
        next(err);
    }
}
module.exports = {
    verifyToken:jwtAuthenticationVerify,
};
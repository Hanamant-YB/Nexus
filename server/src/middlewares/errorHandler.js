class AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err,req,res,next)=>{
    const status = err.statusCode || 500;
    const message = err.message || "something went to wrong";

    console.error("[Error "+status+"]"+message);

    res.status(status).json({
        success:false,
        message:message
    });
}

module.exports = {AppError,errorHandler};
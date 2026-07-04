const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Name is required"],
            trim:true,//removes extra white space whenever we enter the name
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"password is required"],
            minlength:[6,"password must be at least 6 characters"],
            select:false,
        },
        role:{
            type:String,
            enum:["Admin","Member"],
            default:"Member",
        },
    },
    {
        timestamps : true,
    }
);
userSchema.pre('save',async function(){
        const person = this;
        if(!person.isModified('password')){
            return
        }
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(person.password, salt);
            person.password = hashedPassword;
        }catch(err){
            throw err
        }
});
userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        isMatched = await bcrypt.compare(candidatePassword, this.password);
        return isMatched;
    }catch(err){
        throw err;
    }
}
module.exports = mongoose.model("User",userSchema);
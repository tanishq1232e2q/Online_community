const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    role:{
        type:String,
        required:true
    }
   
})


userschema.methods.generatetoken=async function(){
    try {
        //payload
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email
            
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"30d"
        }
    )

    } catch (error) {
        console.log(error);
    }
}



const Users=new mongoose.model("myuser",userschema)
module.exports=Users
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
    companytype:{
        type:String,
        required:true
    },
    
    comsize:{
        type:Number,
        required:true
    },
    aboutcom:{
        type:String,
        required:true
    }


   
})

const Companyreg=new mongoose.model("mycompany",userschema)
module.exports=Companyreg
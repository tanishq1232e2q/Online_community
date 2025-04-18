const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  com: { type: String, required: true },
  
  area: { type: String, required: true },
  areacom: { type: String, required: true },
  recur:{type:String,required:true},
  profile:[{
    name: String,
    email: String,
    address: String,
    qualification: String,
    contact: String,
    skills: String,
    experience: String,
  }]

});


const Apply=new mongoose.model("applyjob", JobSchema);
module.exports = Apply

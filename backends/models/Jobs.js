const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  experience: { type: Boolean, required: true },
  employmentType: { type: String, required: true }, 
  description: { type: String, required: true },
  companyEmail: { type: String, required: true }, // Link job to the registered company
  companyname:{type:String,required:true},
  postedAt: { type: Date, default: Date.now },
});


const Jobs=new mongoose.model("postjob", JobSchema);
module.exports = Jobs

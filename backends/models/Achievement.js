const mongoose=require("mongoose")

const achievementSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: Date,
    likes: {
        type: Number,
        default: 0,
      },
  });

const Ach=new mongoose.model("achieve",achievementSchema)

module.exports=Ach
  

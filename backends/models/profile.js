
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    qualification: String,
    contact: String,
    skills: String,
    experience: String,
    // recur:String

});

const Profile = new mongoose.model('Profile', profileSchema);

module.exports=Profile
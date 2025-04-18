const Jobs = require("../models/Jobs");
const User=require("../models/usermodel")
const newProfile=require("../models/profile")
const bcrypt=require("bcryptjs");
const Apply=require("../models/Apply");
const { all } = require("../route/userroute");
const Achievement=require("../models/Achievement")
const adduser=async(req,res)=>{

    
    const {name,email,password,role}=req.body
    try {

        const salt=10;
        const hashpass=await bcrypt.hash(password,salt);

        const createuser= new User({name,email,password:hashpass,role});

        const userexist=await User.findOne({email:email});

        if (userexist) {
            return res.status(400).send("user exist")
        }
        const savedata=await createuser.save()
        const token=await createuser.generatetoken()
        
        res.json({savedata,token,userid:createuser._id.toString()})

        console.log(savedata);
    } catch (error) {
        console.log(error);
    }


   
}
const loginuser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email:email})

        
        if (user) {
            const comparepass = await bcrypt.compare(password, user.password);

            if (comparepass) {
                res.json({userdata:user, token: await user.generatetoken(), userid: user._id.toString() });
            } else {
                res.status(400).send("Invalid credentials");
            }
            res.json(user)
        } else {
            res.status(400).send("Invalid credentials");
        }
    } catch (error) {
        console.log(error);
    }
}

const getuser=async(req,res)=>{
    const data=req.user
    console.log("inside getauth--"+data);
    return res.json(data)
    
}

const getuserjobs=async(req,res)=>{
    const searchQuery = req.params.query;

        const jobs = await Jobs.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },  
                { description: { $regex: searchQuery, $options: "i" } } 
            ]
        });

        res.json(jobs)

}



const setprofile=async(req,res)=>{
    try {
        console.log(req.body);
        
        
        const Profile = new newProfile(req.body);
        await Profile.save();
        res.status(200).json({ message: 'Profile saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save profile' });
    }
}

const getprofile=async(req,res)=>{
    try {
        // const ss=req.params.query
        const data=await newProfile.find()
        res.json(data)
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to save profile' });
    }
}
const getapply=async(req,res)=>{
    try {
        const ss=req.params.query
        console.log(ss);
        
        const data=await Apply.find({recur:ss})
        return res.json(data)
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to get apply' });
    }
}


const setapply = async (req, res) => {
    try {
        console.log(req.body.profile);
        
        const newApplication = new Apply({
          com: req.body.com,
          area: req.body.area,
          areacom: req.body.areacom,
          recur: req.body.recur,
          profile: req.body.profile, 
        });
    
        await newApplication.save();
        res.status(200).json({ message: "Application saved successfully" });
      } catch (err) {
        console.error("Error saving application:", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
};

const getalluser=async(req,res)=>{
    try {
        const users=await User.find()
        res.json(users)
    } catch (error) {
        console.log(error);
        
    }
}

const setach= async (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      await Achievement.create({ name, email, message, date: new Date() });
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };

const getah=async(req,res)=>{
    try {
        const all = await Achievement.find().sort({ createdAt: -1 });
        res.json(all);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch achievements' });
      }
}

const updateah=async(req,res)=>{
        try {
          const updated = await Achievement.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
          );
          res.json(updated);
        } catch (err) {
          res.status(500).json({ error: 'Failed to like achievement' });
        }
      
}
  

module.exports={adduser,getuser,loginuser,getuserjobs,setprofile,getprofile,setapply,getapply,getalluser,setach,getah,updateah}
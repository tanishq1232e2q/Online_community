const Company=require("../models/RecComapnay")

const Job=require("../models/Jobs")
const addcompany=async(req,res)=>{
    
    const {name,email,companytype,comsize,aboutcom}=req.body
    try {


        const createcom= new Company({name,email,companytype,comsize,aboutcom});

        const userexist=await Company.findOne({email:email});

        if (userexist) {
            return res.status(400).send("company exist")
        }
        const savedata=await createcom.save()
        
        res.json(savedata)
        console.log(savedata);
    } catch (error) {
        console.log(error);
    }

}

const getcompany=async(req,res)=>{
    try {
        const company = await Company.findOne({ email: req.params.email });
        if (!company) {
            return res.status(404).json({ message: "Company not registered" });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const jobpost= async (req, res) => {
    try {
      const { title, description, location, salary, experience, employmentType, companyEmail,companyname } = req.body;
  
      // Check if the recruiter is registered
      const company = await Company.findOne({ email: companyEmail });
      if (!company) {
        return res.status(400).json({ message: "Company not registered" });
      }
  
      const newJob = new Job({
        title,
        description,
        companyEmail,  // Auto-assigned recruiter email
        companyname,
        location,
        salary,
        experience,
        employmentType,
      });
  
      await newJob.save();
      res.status(201).json({ message: "Job posted successfully", job: newJob });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };


  const getjobs= async(req, res) => {
    try {
      const jobs = await Job.find({ companyEmail: req.params.email });
  
      if (!jobs.length) {
        return res.status(404).json({ message: "No jobs found for this company" });
      }
  
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  const alljobs=async(req,res)=>{
    try {
        const jj=await Job.find()
        res.json(jj)
    } catch (error) {
        console.log(error);
        
    }
}


module.exports={addcompany,getcompany,jobpost,getjobs,alljobs}
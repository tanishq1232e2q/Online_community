const express=require("express")
const {addcompany,getcompany, jobpost, getjobs,alljobs}=require("../controller/Reruitercontroller")
const router=express.Router()

router.post("/addcompany",addcompany)

router.get("/getcompany/:email",getcompany)


router.post("/postjob",jobpost)

router.get("/jobs/:email",getjobs)
router.get("/alljobs",alljobs)
module.exports=router

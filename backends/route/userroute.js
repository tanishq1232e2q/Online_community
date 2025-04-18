const express=require("express")
const {adduser,getuser,loginuser, getuserjobs,setprofile,getprofile,setapply,getapply, getalluser,setach, getah,updateah}=require("../controller/usercontroller")
const middle=require("../middleware/middle")
const router=express.Router()

router.post("/joinuser",adduser)
router.post("/loginuser",loginuser)

router.get("/getuser",middle,getuser)
router.get("/getuserjobs/:query",getuserjobs)
router.post("/profile",setprofile)
router.get("/getprofile",getprofile)
router.post("/apply",setapply)
router.get("/getapply/:query",getapply)
router.get("/getalluser",getalluser)
router.post("/achievement",setach)
router.get("/getah",getah)
router.post("/achievement/:id",updateah)


module.exports=router
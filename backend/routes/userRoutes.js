const express=require("express");

const router=express.Router();

const controller=require("../controllers/userController");

const auth=require("../middleware/auth");

router.get("/profile",auth,controller.getProfile);

router.put("/profile",auth,controller.updateProfile);

router.delete("/profile",auth,controller.deleteProfile);

module.exports=router;
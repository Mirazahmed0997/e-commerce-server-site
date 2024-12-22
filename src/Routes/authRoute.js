const express= require("express")
const router= express.Router();
const authController= require("../Controller/auth.Controller.js")

router.post("/signUp", authController.register);
router.post("/signIn", authController.logIn);

module.exports=router;
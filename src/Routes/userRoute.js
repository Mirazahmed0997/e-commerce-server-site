const express= require("express")
const router= express.Router();

const userController= require('../Controller/user.controller.js')

router.get('/profile',userController.getUserProfile);

router.get('/', userController.getallUsers);

module.exports=router
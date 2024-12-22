const { error } = require("console");
const userService=require('../Services/User.service/user.service.js')


const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        // jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY2ODRhZDRiYWNmMTA5ODgyYjliYTgiLCJpYXQiOjE3MzQ3NzIxOTMsImV4cCI6MTczNDk0NDk5M30.0lhiz-7N5QtBr1Bntbo8jHne6vSXFW8E3ruV1R2Bnd4"

        if(!jwt)
        {
            return res.status(404).send({error:'token not found'})
        }

        const User= await userService.getUserProfileByToken(jwt)
        return res.status(200).send(User)

    }
    catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getallUsers=async(req,res)=>
{
    try {
        const users= await userService.getAllUsers();
        return res.status(200).send(users)
    } 
    catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    getUserProfile,
    getallUsers
}
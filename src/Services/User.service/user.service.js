const mongoose= require("mongoose")
const user = require("../../Models/V0/User/user.model.js");
const bcrypt = require("bcrypt")
const jwtProvider = require("../../config/jwtProvider.js");

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        const isUserExist = await user.findOne({ email })

        if (isUserExist) {
            throw new Error( "already Exist")
        }
        password = await bcrypt.hash(password, 8)

        const User = await user.create({ firstName, lastName, email, password });

        return User;
    }

    catch (error) {
        throw new Error(error.message)
    }
}

const findUserById = async (userId) => {
    try {
        const User = await user.findById(userId)
        // .populate("addresses")
        if (!User) {
            throw new Error("User not found with id : ", userId, " Please Sign up first")
        }
        return User;
    }
    catch (error) {
        throw new Error(error.message)
    }
}

const getUserByEmail = async (email) => {
    try {
        const User = await user.findOne({ email })
        if (!User) {
            throw new Error("User not found with email : ", email, " Please Sign up first")
        }
        return User;
    }
    catch (error) {
        throw new Error(error.message)
    }
}

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        const User = await findUserById(userId)
        if (!User) {
            throw new Error("User not found with id : ", userId, " Please Sign up first")
        } 
        return User
    }
    catch (error) {
        throw new Error(error.message)
    }
}

const getAllUsers = async () => {
    try {
        const users = await user.find();
        return users;
    }
    catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { createUser, findUserById, getUserByEmail, getUserProfileByToken, getAllUsers }
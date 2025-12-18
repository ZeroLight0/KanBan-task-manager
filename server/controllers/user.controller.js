import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();

        res.status(200).json({
            success: true, data: users
        })

    }catch(error){
        console.log(error);
    }
}

export const getUser = async (req, res) => {
    try{
        const user = await User.find(req.params.id).select("-password");

        if (!user){
            const error =new Error("User not found");
            throw error
        }

        res.status(200).json({
            success: true, data: user
        })

    }catch(error){
        console.log(error);
    }}
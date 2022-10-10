import User from "../models/Users.js"
import bcrypt from "bcrypt"

export const getUsers = async(req,res,next) =>{
    try{
        let users = await User.find()
        if(users){
            return res.status(200).json({users})
        }else{
            return res.status(404).json({message:"No users were found."})
        }
    }
    catch(error){
        console.log(error.message) 
    }
}

export const signup = async(req,res,next) =>{
    try{
        const {username,password,email} = req.body
        let userEmail = await User.findOne({email})
        let existing = await User.findOne({username})

        if(userEmail) return res.status(400).json({message:`user with email ${email} already exists.`})
        if(existing) return res.status(400).json({message:`user with username ${username} already exists.`})

        let saltPassword = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password,saltPassword)

        let person = new User({
            username:username,
            password:hashPassword,
            email:email
        })

        let users = await person.save()
        res.status(200).json({users})

    }
    catch(error){
        console.log(error.message) 
    }
}

export const login = async(req,res,next) =>{
    try{
        const {email,password} = req.body
        let person = await User.findOne({email})

        if(!person) return res.status(400).json({message:"wrong password email combination."})

        let passwordCheck = await bcrypt.compare(password,person.password)
        if(!passwordCheck) return res.status(400).json({message:"wrong password email combination."})

        res.status(200).json({message:"success",user:person})
    }
    catch(error){
        console.log(error.message) 
    }
}
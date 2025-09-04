// import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"2d"})
}


export const register = async (req , res) => {
    const {name, email, password, role} = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({message: "This User is Already exists!"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password:hashedPassword, role})

        res.status(200).json(
            {
                message:"Congratulation You are now a memebre of our Bubbl dream",
                _id:user._id,
                name:user.name,
                email:user.email,
                token: generateToken(user._id)
            }
        )
    } catch (error) {
            res.status(500).json({message:"Server Error", error:error.message})
    }   
}

export const login = async (req, res) => {
    const { email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: `There is no User with this Email: ${email}.`})
        }
        const passwordCheck = bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(401).json({message:"Please provide a valid password."})
        }

        res.status(200).json({message:`Welcome back ${user.name}.`, user, token:generateToken(user._id)})

    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}



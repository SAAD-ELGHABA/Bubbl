// import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../services/emailService.js";
import { verificationEmailTemplate } from "../services/emailTemplates.js";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"2d"})
}


export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const session = await mongoose.startSession(); 

    try {
        session.startTransaction(); 

        const userExists = await User.findOne({ email }).session(session);
        if (userExists) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "This User Already Exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create([{ name, email, password: hashedPassword, role }], { session });
        console.log(user);
        
        const userToken = generateToken(user[0]._id);
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${userToken}`;

        await sendEmail({
            to: user[0].email,
            subject: "Verify Your Email",
            html: verificationEmailTemplate({ name: user[0].name, verificationUrl }),
        });

        await session.commitTransaction(); 
        session.endSession();

        res.status(200).json({
            message: "Congratulations! You are now a member of our Bubbl Dream.",
            success: true,
        });

    } catch (error) {
        // Rollback transaction on any error
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


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


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        avatar: picture,
      });
    }

    const accessToken = generateToken(user._id)

    res.status(200).json({
      message: "Google login successful",
      user,
      token: accessToken,
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(400).json({ error: "Invalid Google token" });
  }
};

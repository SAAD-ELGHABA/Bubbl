// import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Profile from '../models/Profile.js'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../services/emailService.js";
import { verificationEmailTemplate } from "../services/emailTemplates.js";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";



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
            user_slug:user[0]?.slug
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
        // const token = generateToken(user._id)
        // res.cookie("token", token, {
        //   httpOnly: true,
        //   secure:process.env.NODE_ENV === "production",
        //   sameSite: "strict",
        //   maxAge: 60 * 60 * 1000 * 10
        // })

      const profile = await Profile.findOne({ user_id: user._id });

      res.json({ user, profile ,token});


    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message})
    }
}


export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body; // access_token

    const { data: googleUser } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { sub, email, name, picture } = googleUser;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        avatar: picture.url,
      });
    }

    const accessToken = generateToken(user._id);

 let profile = await Profile.findOne({ user_id: user._id });
    
    if (!profile) {
      profile = await Profile.create({ user_id: user._id });
    }

    res.status(200).json({
      message: "Google login successful",
      user,
      profile,
      token: accessToken,
    });
  } catch (err) {
    console.error("Google Auth Error:", err.response?.data || err.message);
    res.status(400).json({ error: "Invalid Google token" });
  }
};


export const resendEmail = async (req, res) => {
  try {
    const { user_slug } = req.params;

    const user = await User.findOne({ slug: user_slug });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userToken = generateToken(user._id);
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${userToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify Your Email",
      html: verificationEmailTemplate({ name: user.name, verificationUrl }),
    });

    return res.status(200).json({
      success: true,
      message: "Verification email resent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(400).json({ error: "User ID is required" });
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ error: "Invalid user ID" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }
    const profile = await Profile.findOne({ user_id: user._id });
    
    res.status(200).json({
      user,
      profile: profile || null, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
};


export const setProfile = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const userId = req.user?.id; 
    if (!userId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      avatar,
      coverImage,
      bio,
      address,
      phone,
      city,
      country,
      gender,
      birthDate,
      profession,
      portfolioUrl,
    } = req.body;

    if (!phone || !profession || !gender) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Phone, Profession, and Gender are required" });
    }

    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    if (age < 18) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "You must be at least 18 years old" });
    }

    let profile = await Profile.findOne({ user_id: userId }).session(session);
    if (!profile) {
      profile = new Profile({ user_id: userId });
    }

    profile.avatar = avatar || profile.avatar;
    profile.coverImage = coverImage || profile.coverImage;
    profile.bio = bio || profile.bio;
    profile.address = address || profile.address;
    profile.phone = phone;
    profile.city = city || profile.city;
    profile.country = country || profile.country;
    profile.gender = gender;
    profile.birthDate = birthDate;
    profile.profession = profession;
    profile.portfolioUrl = portfolioUrl || profile.portfolioUrl;
    profile.isProfileCompleted = true;

    await profile.save({ session });

    await User.findByIdAndUpdate(
      userId,
      { isProfileCompleted: true },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  
  try {
    const userId = req.user?.id; 
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }
    const emailExists = await User.findOne({ email, _id: { $ne: userId } });
    if (emailExists) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    user.name = name;
    user.email = email;
    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.user?.id; 
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new passwords are required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch =  bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
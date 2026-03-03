import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { generateTokenandSetCookie } from "../utils/generateTokenandSetCookie.js";
import { sendVerifyEmail, sendVerificationSuccessfulEmail } from "../mailtrap/email.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    //check if user with the same email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "User with this email already exists"
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const verficationToken = Math.floor(100000 + Math.random() * 900000);
    const lastLogin = new Date().toISOString()
    const savedUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      lastLogin: lastLogin,
      verficationToken,
      verficationTokenExpiresAt: Date.now() + 1 * 24 * 60 * 60 * 1000
    });
    // save to mongodb database
    await savedUser.save();

    //set cookies
    generateTokenandSetCookie(savedUser._id, res);


    sendVerifyEmail(savedUser.email, savedUser.verficationToken);
    
    // objectify user data and remove sensitive information
    const userResponse = savedUser.toObject();
    delete userResponse.password;
    delete userResponse._id;
    delete userResponse.verficationToken;
    delete userResponse.verficationTokenExpiresAt;

    res.status(201).json({
      status: "success",
      data: { user: userResponse }
    });

  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
}

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await UserModel.findOne({ 
      verficationToken: code, 
      verficationTokenExpiresAt: { $gt: Date.now() } 
    });

    //verfication code doesnt not match or expired
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid or expired verification code"
      });
    }
    user.isVerified = true;
    user.verficationToken = undefined;
    user.verficationTokenExpiresAt = undefined;
    await user.save();
    
    await sendVerificationSuccessfulEmail(user.email);
    res.status(200).json({
      status: "success",
      message: "You have successfully verified"
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    //check if user with the same email already exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User with this email not exists"
      });
    }
    const isMatched = await bcryptjs.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email or password"
      });
    }

    //generate token and shows how long it will stay before it expires
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      status: "success",
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
      }
    });


  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
}

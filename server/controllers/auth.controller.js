import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password } = req.body;
    let lowercase_email = email.toLowerCase();
    let lowercase_username = username.toLowerCase();

    const existingUserEmail = await User.findOne({ lowercase_email });
    if (existingUserEmail) {
      const error = new Error("User already exists with this email");
      throw error;
    }
    const existingUsername = await User.findOne({ lowercase_username });
    if (existingUsername) {
      const error = new Error("User already exists with this username");
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ lowercase_username, lowercase_email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: true,
      message: "User created successfully",
      token,
      data: {
        user: {
          id: newUsers._id,
          username: newUsers.lowercase_username,
          email: newUsers.lowercase_email,
        },
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let lowercase_email = email.toLowerCase();
    const user = await User.findOne({ lowercase_email });

    if (!user) {
      const error = new Error("User does not exist with this email");
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Incorrect password");
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

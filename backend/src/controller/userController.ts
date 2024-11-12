import { NextFunction, Request, Response } from "express";
import User from "../models/userModels";
import dotenv from "dotenv";

import { hashPassword } from "../utils/bcrypt/hashPassword";
import { generateAccessToken } from "../utils/jwt/generateAccessToken";
import { generateRefreshToken } from "../utils/jwt/generateRefreshToken";

import { comparePassword } from "../utils/bcrypt/comparePassword";
import jwt from "jsonwebtoken";

dotenv.config();
interface DecodedToken {
  _id: string;

  [key: string]: any;
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);

    // const { value, error } = userSignupValidation.validate(req.body);
    // if (error) {
    //   res.status(400).json({ success: false, message: error.message });
    //   return;
    // }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ success: false, message: "User Already Exists" });
      return;
    }

    req.body.password = await hashPassword(req.body.password);
    const newUser = await User.create(req.body);

    const accessToken = generateAccessToken({
      _id: String(newUser._id),
      email: newUser.email,
    });

    const refreshToken = generateRefreshToken({
      _id: String(newUser._id),
      email: newUser.email,
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7200000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userWithoutPassword = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isLogged: true,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);

    const { email ,password } = req.body;

    

    let loginUser;
    if (email) {
      loginUser = await User.findOne({ email: email });
      console.log(loginUser);
    } 

    if (!loginUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const match = await comparePassword(password, loginUser.password);
    if (!match) {
      res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });
      return;
    }

    const accessToken = generateAccessToken({
      _id: String(loginUser._id),
      email: loginUser.email,
    });

    const refreshToken = generateRefreshToken({
      _id: String(loginUser._id),
      email: loginUser.email,
    });
    console.log("access", accessToken);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7200000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    const userWithoutPassword = {
      _id: loginUser._id,
      name: loginUser.name,
      email: loginUser.email,
      isLogged: true,
    };

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    console.log("cookie cleared");

    res.status(201).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};



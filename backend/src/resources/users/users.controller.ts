import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../db/connect";
import { NextFunction, Request, Response } from "express";
import url from "url";
import dotenv from "dotenv";
import { json } from "body-parser";
import { profile } from "console";
dotenv.config();

/**
 *@description Register new user credentials
 *@route POST /register
 */

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, email, username } = req.body; //
  const body = req.body; // will be used in prisma.user.create

  // Hash password
  const saltRounds = 10;
  const hasedPassword = await bcrypt.hash(password, saltRounds);
  const lowerCase = (value: string) => value.toLowerCase();

  try {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: lowerCase(email),
      },
    });

    if (existingEmail)
      return res.status(400).json({
        message: "The email is already in use. Please use a different email.",
      });

    const registerUser = await prisma.user.create({
      data: {
        ...body,
        password: hasedPassword,
        profileImg:
          "/SortedGames/images/avatars/withBackground/avocado-rambler.svg",
      },
    });

    console.log(body);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 *@description Log in user
 *@route POST /login
 */
export const login = async (req: Request, res: Response) => {
  const { googleLogin, username, email, password } = req.body;

  try {
    const checkForUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkForUser)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect. Try again!" });

    // password fron req.body is being compared with hashed password from db.
    const isMatching = await bcrypt.compare(password, checkForUser.password);

    if (!isMatching)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect. Try again!" });

    // Check for the JWT secret at dotenv.
    if (!process.env.JWT_SECRET)
      return res.status(500).json({ message: "Internal server error!" });

    // Create JWT token
    const token = jwt.sign({ id: checkForUser.id }, process.env.JWT_SECRET);

    const userData = {
      userId: checkForUser.id,
      username: checkForUser.username,
      profileImg: checkForUser.profileImg,
      token: token,
    };

    if (googleLogin) {
      console.log("Google login.");
      return res.redirect(
        url.format({
          pathname: "http://localhost:5173/SortedGames/",
          query: userData,
        })
      );
    }

    res.json({
      message: username
        ? "User was created and logged in successfully."
        : "User was logged in successfully.",
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

/**
 * @description Change user profile image
 * @route PUT /profileImage
 */

export const profileImage = async (req: Request, res: Response) => {
  console.log("Running profileImage route...");
  const { userId, profileImg } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profileImg: profileImg,
      },
    });

    res.status(200).json({
      message: "Profile image updated successfully",
      user: { ...req.body },
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Sorry, something went wrong while trying to change the profile picture.",
    });
    console.log("Finished the profileImage route with failure...");
  }
};

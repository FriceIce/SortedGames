import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { prisma } from "../../db/connect";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

type Profile = {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/auth/google/callback";

export const googleURL = (req: Request, res: Response) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile&email`;
  res.json({ url });
};

export const googleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    // Code to handle user authentication and retrieval using the profile data
    console.log("user:", profile);
    const { name: username, id } = profile as Profile;

    // Hash password
    const password = `google-${id}`;
    const saltRounds = 10;
    const hasedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const existingEmail = await prisma.user.findUnique({
        where: {
          email: `google-${id}`,
        },
      });

      req.body = {
        googleLogin: true,
        username,
        password: `google-${id}`,
        email: `google-${id}`,
      };

      if (!existingEmail) {
        await prisma.user.create({
          data: {
            username,
            profileImg:
              "/SortedGames/images/avatars/withBackground/avocado-rambler.svg",
            email: "google-" + id,
            password: hasedPassword,
          },
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
    next();
  } catch (error) {
    console.error("Error:", error);
    res.redirect("http://localhost:5173/SortedGames/sign-in");
  }
};

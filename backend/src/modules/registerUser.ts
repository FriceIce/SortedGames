import { Prisma, PrismaClient } from "@prisma/client";
import { Response } from "express";
import { DefaultArgs } from "@prisma/client/runtime/library";

const register = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  body: any,
  res: Response,
  email: string,
  username: string,
  hasedPassword?: string
) => {
  const lowerCase = (value: string) => value.toLowerCase();

  const existingEmail = await prisma.user.findUnique({
    where: {
      email: lowerCase(email),
    },
  });

  const existingUsername = await prisma.user.findUnique({
    where: {
      username: lowerCase(username),
    },
  });

  if (existingEmail)
    return res.status(400).json({
      message: "The email is already in use. Please use a different email.",
    });
  if (existingUsername)
    return res.status(400).json({
      message:
        "The username is already in use. Please enter a different username.",
    });

  const registerUser = await prisma.user.create({
    data: {
      ...body,
      password: hasedPassword,
      profileImg:
        "/SortedGames/images/avatars/withBackground/avocado-rambler.svg",
    },
  });
};

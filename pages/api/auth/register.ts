import cookie from "cookie";
import prisma from "../../../utils/prisma";
import jwt, { Secret } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const secretKey = process.env.JWT_SECRET;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, name } = req.body;

  try {
    // Check if user already exists with the given email
    const existingUser = await prisma.user.findFirst({
      where: {
        email: String(email),
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: String(name),
        email: String(email),
        password: String(password),
      },
      select: {
        id: true,
        email: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, secretKey as Secret, { expiresIn: "1d" });

    // Set cookie
    res.setHeader("Set-Cookie", cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    }));

    // Send user data and token
    res.json({ user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

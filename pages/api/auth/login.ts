import cookie from "cookie"
import prisma from '../../../utils/prisma';
import jwt, { Secret } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"



const secretKey = process.env.JWT_SECRET;
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    //encode the password
  const user = await prisma.user.findFirst({
    where: {
        email: req.body.email,
        password: String(req.body.password)
    },select:{
        id:true,
        email:true,
    }
    })
    if (user) {
        //generate jwt token
        const token = jwt.sign({id: user.id}, secretKey as Secret, {expiresIn: "1d"})
        //set cookie
        res.setHeader("Set-Cookie", cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3600,
            path: "/"
        }))
        // send user data and token
        res.json({user, token})
    } else {
       // res status 401
        res.status(401).json({message: "Invalid credentials"})
    }
}

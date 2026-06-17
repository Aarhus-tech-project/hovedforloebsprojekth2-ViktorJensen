import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pwdHash = await bcrypt.hash(password, 10);
    
    try {
        const newUser = await prisma.userData.create({
        data: {
            username,
            email,
            pwdHash,
        },
        });
        const token = jwt.sign({ userID: newUser.userID }, process.env.JWT_SECRET!, {
            expiresIn: "1h", // token expires in 1 hour
        });
        (await cookies()).set("token", token, {
            httpOnly: true, //cannot be accessed by JavaScript
            // secure: process.env.NODE_ENV === "production", // only use HTTPS in production
            sameSite: "strict", // Prevent CSRF
            maxAge: 60 * 60, // cookie expires in 1 hour
            path: "/", // Cookies site wide
        })
        return NextResponse.json({ userID: newUser.userID, message: "Account created successfully" }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
        { error: error?.message || "Unable to create account" },
        { status: 500 }
        );
    }
}
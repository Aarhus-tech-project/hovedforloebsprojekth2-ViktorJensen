import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    if ( !username || !password ) {
        return NextResponse.json(
            { error: "Email and password required" },
            { status: 400 }
        );
    }

    const user = await prisma.userData.findUnique({ where: { username } });
    if (!user) {
        return NextResponse.json(
            { error: "Invalid username or password" },
            { status: 400 }
        )
    }

    const isPasswordValid = await bcrypt.compare(password, user.pwdHash);
    if (!isPasswordValid) {
        return NextResponse.json(
            { error: "Invalid username or password" },
            { status: 400 }
    )}
    
    const token = jwt.sign({ userId: user.userID }, process.env.JWT_SECRET!, {
        expiresIn: "1h"
    });
    (await cookies()).set("token", token, {
            httpOnly: true, //cannot be accessed by JavaScript
            // secure: process.env.NODE_ENV === "production", // only use HTTPS in production
            sameSite: "strict", // Prevent CSRF
            maxAge: 60 * 60, // cookie expires in 1 hour
            path: "/", // Cookies site wide
    })

    return NextResponse.json({ message: "Login successful" });
}
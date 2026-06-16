import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userID: string}
    
        const user = await prisma.userData.findUnique({
        where: {userID: decoded.userID},
        select: {
            userID: true,
            username: true,
            email: true,
        },
    });

        if (!user) {
            return NextResponse.json({ error: "User not found"}, {status: 404});
        }

        return NextResponse.json({ user })
    } catch {
        return NextResponse.json({ error: "Invalid or expired token"}, { status: 401 })
    }
}
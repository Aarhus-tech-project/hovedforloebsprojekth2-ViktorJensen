import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prisma";

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

        return NextResponse.json({ userId: newUser.userID }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
        { error: error?.message || "Unable to create account" },
        { status: 500 }
        );
    }
}
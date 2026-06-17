import { prisma } from "../../../lib/prisma";
import {CreateUserInput} from "../lib/types"

export const CreateUser = async ({ username, email, pwdHash }: CreateUserInput) => {
    const existingUser = await prisma.userData.findFirst({where: {username}})
    if (existingUser) {
        throw Error("User already exists")
    }
    const newUser = await prisma.userData.create({
        data: {
        username,
        email,
        pwdHash,
        },
});

console.log("New user created", newUser);
return newUser;
};
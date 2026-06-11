import { prisma } from "../../../lib/prisma";

type CreateUserInput = {
    username: string;
    email: string;
    pwdHash: string;
};

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
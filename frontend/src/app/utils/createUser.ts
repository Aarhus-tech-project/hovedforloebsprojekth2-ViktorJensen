import { prisma } from "../../../lib/prisma";

type CreateUserInput = {
    username: string;
    email: string;
    pwdHash: string;
};

export const CreateUser = async ({ username, email, pwdHash }: CreateUserInput) => {
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
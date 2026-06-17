export type CreateUserInput = {
    username: string;
    email: string;
    pwdHash: string;
};

export type User = {
    userID?: string;
    username: string;
    email: string;
}
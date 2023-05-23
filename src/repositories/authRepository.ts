import { Users } from "@prisma/client";

import { prisma } from "../config/database.js";

export type UserData = Omit<Users, "id">;

async function findUserByUsername(username: string) {
    return prisma.users.findUnique({
        where: { username },
        select: { id: true, username: true, password: true },
    });
};

async function registerUser(username: string, password: string) {
    await prisma.users.create({ data: { username, password } });
};

const authRepository = {
    findUserByUsername,
    registerUser,
};

export default authRepository;
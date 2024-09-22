import { PrismaClient } from "@prisma/client";
import UserModel from "./UserModel";
import bcrypt from 'bcrypt';

export default class UserRepository {
    public static async create(user: UserModel) {
        const hashPassword = await bcrypt.hash(user.password, 8);
        return await new PrismaClient().user.create({
            data: {
                username: user.username,
                email: user.email,
                password: hashPassword,
            }
        })
    }

    public static async findAll() {
        return await new PrismaClient().user.findMany();
    }

    public static async findById(id: string) {
        return await new PrismaClient().user.findUnique({
            where: { id: id }
        });
    }

    public static async findByEmail(email: string) {
        return await new PrismaClient().user.findFirst({
            where: {
                email: email
            }
        });
    }

    public static async update(email: string, newDataUser: UserModel) {
        const idUser = (await UserRepository.findByEmail(email))?.id;
        const hashForNewPassword = await bcrypt.hash(newDataUser.password, 8);
        await new PrismaClient().user.update({
            data: {
                username: newDataUser.username,
                email: newDataUser.email,
                password: hashForNewPassword
            },
            where: {
                id: idUser
            }
        });
    }

    public static async delete(email: string) {
        await new PrismaClient().user.delete({
            where: {
                email: email
            }
        })
    }
}
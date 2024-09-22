import { PrismaClient } from "@prisma/client";
import PostModel from "./PostModel";
import UserRepository from "../user/UserRepository";

export default class PostRepository {

    public static async create(post: PostModel, email: string) {
        const user = await UserRepository.findByEmail(email);
        
        return await new PrismaClient().post.create({
            data: {
                title: post.title,
                bodyPost: post.bodyPost,
                userId: String(user?.id)
            }
        })
    }

    public static async getAllPosts() {
        return await new PrismaClient().post.findMany();
    }

    public static async getAllPostsCreatedByUser(email: string) {
        const userId = (await UserRepository.findByEmail(email))?.id;
        return await new PrismaClient().post.findMany({
            where: {
                userId: String(userId)
            }
        })
    }

    public static async update({ title, bodyPost }: PostModel) {
        await new PrismaClient().post.updateMany({
            data: {
                title: title,
                bodyPost: bodyPost
            },
            where: {
                title: title
            }
        })
    }

    public static async delete(id: string) {
        await new PrismaClient().post.deleteMany({
            where: {
                id: id
            }
        })
    }
}
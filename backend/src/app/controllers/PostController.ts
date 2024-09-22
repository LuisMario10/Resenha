import PostModel from "../domain/post/PostModel";
import PostRepository from "../domain/post/PostRepository";

export default class PostController {

    public static async post(req: any, res: any) {
        const { useremail, title, bodyPost } = req.body;
        
        const result = await PostRepository.create(new PostModel(title, bodyPost, useremail), useremail);
        return res.status(201).json(result);
    }

    public static async getAll(req: any, res: any) {
        const result = await PostRepository.getAllPosts();
        return res.status(200).json(result);
    }

    public static async getAllPostForUser(req: any, res: any) {
        const result = await PostRepository.getAllPostsCreatedByUser(req.body.email);
        return res.status(200).json(result);
    }

    public static async getPostByRegister(req: any, res: any) {
        const posts = await PostRepository.getAllPostsCreatedByUser(req.body.email);
        const result = posts.filter(e => e.registration === Number(req.params.regis));
        return res.status(200).json(result);
    }

    public static async put(req: any, res: any) {
        await PostRepository.update(req.body);
        return res.status(201).json("Update Sucess!");
    }

    public static async delete(req: any, res: any) {
        await PostRepository.delete(req.body.idPost);
        res.status(201).json({ menssage: "User deleted!" });
    }
}
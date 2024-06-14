import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostController {
    constructor() {}

    async listPosts(req: Request, res: Response) {
        const posts = await prisma.post.findMany();
        res.json({ posts });
    }

    async createPost(req: Request, res: Response) {
        const { title, content, authorId } = req.body;

        try {
            const post = await prisma.post.create({
                data: { title, content, authorId },
            });

            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao criar post.",
            });
        }
    }

    async deletePost(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await prisma.post.delete({
                where: { id: Number(id) },
            });

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: "Erro ao deletar post.",
            });
        }
    }
}

export default new PostController();
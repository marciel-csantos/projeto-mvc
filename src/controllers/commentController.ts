import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentController {
    constructor() {}

    async listComments(req: Request, res: Response) {
        const comments = await prisma.comment.findMany();
        res.json({ comments });
    }

    async createComment(req: Request, res: Response) {
        const { content, postId, authorId } = req.body;

        try {
            const comment = await prisma.comment.create({
                data: {
                    content,
                    post: { connect: { id: postId } },
                    author: { connect: { id: authorId } },
                },
            });

            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao criar comentário.",
            });
        }
    }

    async updateComment(req: Request, res: Response) {
        const { id } = req.params;
        const { content } = req.body;

        try {
            const comment = await prisma.comment.update({
                where: { id: Number(id) },
                data: { content },
            });

            res.json(comment);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao atualizar comentário.",
            });
        }
    }

    async deleteComment(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await prisma.comment.delete({
                where: { id: Number(id) },
            });

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: "Erro ao deletar comentário.",
            });
        }
    }
}

export default new CommentController();

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
    constructor() {}

    async listUsers(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        res.json({
            users
        });
    }

    async createUser(req: Request, res: Response) {
        const { email, name } = req.body;

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({
                    error: "O email já está em uso.",
                });
            }

            const user = await prisma.user.create({
                data: { email, name },
            });

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao criar usuário.",
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { email, name } = req.body;

        try {
            const user = await prisma.user.update({
                where: { id: Number(id) },
                data: { email, name },
            });

            res.json(user);
        } catch (error) {
            res.status(500).json({
                error: "Erro ao atualizar usuário.",
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await prisma.user.delete({
                where: { id: Number(id) },
            });

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: "Erro ao deletar usuário.",
            });
        }
    }
}

export default new UserController();

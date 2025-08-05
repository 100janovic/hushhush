import { PrismaClient } from "../generated/prisma/client.js";

export const secrets = async (req, res) => {
    const userId = req.user.id;
    const db = new PrismaClient();

    const secrets = await db.secret.findMany({
        where: { userId }
    })

    const mapped = secrets.reverse().map(s => ({
        ...s,
        value: s.value
            .split('')
            .map((v, index) => index > s.value.length - 4 ? v : '*')
            .join('')
    }));

    res.status(200).json({
        secrets: mapped
    });
};

export const getSecret = async (req, res) => {
    const userId = req.user.id;
    const secretId = req.params.secretId;
    const db = new PrismaClient();
    const secret = await db.secret.findUnique({
        where: {
            id: secretId,
            userId
        }
    })

    res.status(200).json({
        secret
    });
}

export const addSecret = async (req, res) => {
    const { slug, value } = req.body;
    const userId = req.user.id;
    const db = new PrismaClient();
    const newSecret = await db.secret.create({
        data: {
            slug,
            value,
            userId
        },
        select: {
            id: true,
            slug: true,
            value: true,
            userId: true
        }
    });

    res.status(200).json({
        message: "Secret added!",
        secret: newSecret
    });
};

export const deleteSecret = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const db = new PrismaClient();
    await db.secret.delete({
        where: {
            id,
            userId
        }
    });
    
    res.status(200).json({
        message: "Secret deleted!",
        id,
        userId
    });
}
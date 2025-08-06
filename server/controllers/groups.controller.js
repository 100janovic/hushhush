import { PrismaClient } from "../generated/prisma/client.js";

export const updateGroup = async (req, res) => {
    const { name, isPublic } = req.body;
    const groupId = req.params.groupId;
    const userId = req.user.id;

    const db = new PrismaClient();
    const group = await db.group.update({
        data: {
            name,
            userId,
            isPublic
        },
        where: {
            id: groupId,
            userId
        }
    });

    res.status(200).json({
        group
    });
}

export const addGroup = async (req, res) => {
    const { name, isPublic } = req.body;
    const userId = req.user.id;
    const db = new PrismaClient();
    const newGroup = await db.group.create({
        data: {
            name,
            userId,
            isPublic
        },
        select: {
            id: true,
            name: true,
            userId: true,
            isPublic: true
        }
    });

    res.status(200).json({
        message: "Group added!",
        group: newGroup
    });
};

export const deleteGroup = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const db = new PrismaClient();
    await db.group.delete({
        where: {
            id,
            userId
        }
    });

    res.status(200).json({
        message: "Group deleted!",
        id,
        userId
    });
}
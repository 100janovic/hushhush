import { PrismaClient } from "../generated/prisma/client.js";

export const getGroup = async (req, res) => {
    const groupId = req.params.groupId;
    const db = new PrismaClient();
    const group = await db.group.findUnique({
        where: {
            id: groupId
        }
    })

    if (!group || !group.isPublic) {
        res.status(200).json({
            group: null
        });
        return;
    }

    res.status(200).json({
        group
    });
}
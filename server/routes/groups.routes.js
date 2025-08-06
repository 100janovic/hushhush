import { Router } from "express";
import { addGroup, deleteGroup, updateGroup } from "../controllers/groups.controller.js";

const router = Router();

router.post('/', addGroup);
router.post('/:groupId', updateGroup);
router.delete('/:id', deleteGroup);

export default router;
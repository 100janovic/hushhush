import { Router } from "express";
import { getGroup } from "../controllers/groups.public.controler.js";

const router = Router();

router.get('/:groupId', getGroup);

export default router;
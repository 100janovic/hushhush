import { Router } from "express";
import { addSecret, deleteSecret, getSecret, secrets, updateSecret } from "../controllers/secrets.controller.js";

const router = Router();

router.get('/', secrets);
router.get('/:secretId', getSecret);
router.post('/:secretId', updateSecret);
router.post('/', addSecret);
router.delete('/:id', deleteSecret);

export default router;
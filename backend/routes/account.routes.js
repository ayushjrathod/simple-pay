import authMiddleware from "../middlewares/auth.js";
import { Router } from "express";
const router = Router();
import { getBalance, transferMoney } from "../controllers/account.controllers.js";

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transferMoney);

export default router;
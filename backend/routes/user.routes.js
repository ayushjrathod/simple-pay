import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
const router = Router();

import {
  registerUser,
  loginUser,
  bulkFetchUsers,
  updateUserDetails,
} from "../controllers/user.controllers.js";

router.route("/register").post(registerUser);
router.route("/login", loginUser);
router.route("/bulk").get(bulkFetchUsers);
router.put("/update-user", authMiddleware, updateUserDetails);

export default router;

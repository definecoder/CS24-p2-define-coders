import express from "express";
import authChecker from "../middlewares/auth";
import { getUserById, updateUser } from "../controllers/profile";

const router = express.Router();

router.route("/").get(authChecker, getUserById);
router.route("/").put(authChecker, updateUser);

export default router;

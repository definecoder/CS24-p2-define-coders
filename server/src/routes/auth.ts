import express from "express";
import { createUser, login } from "../controllers/auth";
import authChecker from "../middlewares/auth";

const router = express.Router();

router.route("/create").post(authChecker, createUser); // here system admin guard will also be placed
router.route("/login").post(login);

export default router;

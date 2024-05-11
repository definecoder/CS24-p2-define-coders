import express from "express";
const router = express.Router();

import { addIssue, getAllIssues } from "../controllers/issue";

router.route("/create").post(addIssue);
router.route("/all").get(getAllIssues);

export default router;

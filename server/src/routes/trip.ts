import express from "express";
import { createTrip } from "../controllers/trip";
const router = express.Router();

router.route("/create").post(createTrip);

export default router;

import express from "express";
import { addVehicleEntry } from "../controllers/landfillVehicle";
const router = express.Router();

router.route("/create").post(addVehicleEntry);

export default router;

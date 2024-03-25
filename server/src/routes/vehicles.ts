import express from "express";
import {
  addVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
} from "../controllers/vehicle";

const router = express.Router();

router.route("/create").post(addVehicle);
router.route("/").get(getAllVehicles);
router.route("/:vehicleId").get(getVehicleById);
router.route("/:vehicleId").put(updateVehicle);
router.route("/:vehicleId").delete(deleteVehicle);

export default router;

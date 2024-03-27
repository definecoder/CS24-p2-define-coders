import express from "express";
import {
  createVehicle,
  editVehicle,
  fetchAllVehicles,
  fetchVehicleById,
  getVehiclesOnQuery,
  removeVehicle,
} from "../controllers/vehicle";

const router = express.Router();

router.route("/create").post(createVehicle);
router.route("/search").get(getVehiclesOnQuery);
router.route("/").get(fetchAllVehicles);
router.route("/:vehicleId").get(fetchVehicleById);
router.route("/:vehicleId").put(editVehicle);
router.route("/:vehicleId").delete(removeVehicle);

export default router;

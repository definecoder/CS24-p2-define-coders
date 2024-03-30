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

router.route("/create").post(createVehicle); // add permission
router.route("/search").get(getVehiclesOnQuery);
router.route("/").get(fetchAllVehicles);
router.route("/:vehicleId").get(fetchVehicleById);
router.route("/:vehicleId").put(editVehicle); // add permission
router.route("/:vehicleId").delete(removeVehicle); // add permission

export default router;

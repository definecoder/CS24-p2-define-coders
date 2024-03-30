import express from "express";
import {
  addVehicleEntry,
  deleteVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
} from "../controllers/landfillVehicle";
const router = express.Router();

router.route("/create").post(addVehicleEntry); // add permission
router.route("/").get(getAllVehicleEntries);
router.route("/:vehicleEntryId").get(getVehicleEntryById);
router.route("/:vehicleEntryId").put(updateVehicleEntry); // add permission
router.route("/:vehicleEntryId").delete(deleteVehicleEntry); // add permission

export default router;

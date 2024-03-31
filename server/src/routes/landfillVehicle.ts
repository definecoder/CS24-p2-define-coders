import express from "express";
import {
  addVehicleEntry,
  deleteVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
} from "../controllers/landfillVehicle";
import { authorizer } from "../middlewares/authorizer";
import { PERMISSIONS } from "../permissions/permissions";
const router = express.Router();

router
  .route("/create")
  .post(authorizer(PERMISSIONS.CREATE_LANDFILL_VEHICLE_ENTRY), addVehicleEntry); // add permission
router.route("/").get(getAllVehicleEntries);
router.route("/:vehicleEntryId").get(getVehicleEntryById);
router
  .route("/:vehicleEntryId")
  .put(
    authorizer(PERMISSIONS.UPDATE_LANDFILL_VEHICLE_ENTRY),
    updateVehicleEntry
  ); // add permission
router
  .route("/:vehicleEntryId")
  .delete(
    authorizer(PERMISSIONS.DELETE_LANDFILL_VEHICLE_ENTRY),
    deleteVehicleEntry
  ); // add permission

export default router;

import express from "express";
import {
  addlandfill,
  deleteLandfill,
  getAllLandfills,
  getLandfillById,
  updateLandfill,
} from "../controllers/landfills";
import { authorizer } from "../middlewares/authorizer";
import { PERMISSIONS } from "../permissions/permissions";

const router = express.Router();

router
  .route("/create")
  .post(authorizer(PERMISSIONS.CREATE_LANDFILL), addlandfill); // add permission
router.route("/").get(getAllLandfills);
router.route("/:landfillId").get(getLandfillById);
router
  .route("/:landfillId")
  .put(authorizer(PERMISSIONS.UPDATE_LANDFILL), updateLandfill); //  add permission
router
  .route("/:landfillId")
  .delete(authorizer(PERMISSIONS.DELETE_LANDFILL), deleteLandfill); // add permision

export default router;

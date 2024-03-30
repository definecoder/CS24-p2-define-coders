import express from "express";
import {
  addSTS,
  deleteSTS,
  getAllSTS,
  getSTSById,
  updateSTS,
} from "../controllers/sts";
import authChecker from "../middlewares/auth";
import { authorizer } from "../middlewares/authorizer";
import { PERMISSIONS } from "../permissions/permissions";

const router = express.Router();

router.route("/create").post(authorizer(PERMISSIONS.CREATE_STS), addSTS); // add permission
router.route("/").get(getAllSTS);
router.route("/:stsId").get(getSTSById);
router.route("/:stsId").put(authorizer(PERMISSIONS.UPDATE_STS), updateSTS); // add permission
router.route("/:stsId").delete(authorizer(PERMISSIONS.DELETE_STS), deleteSTS); // add permision

export default router;

import express from "express";
import {
  addSTS,
  deleteSTS,
  getAllSTS,
  getSTSById,
  updateSTS,
} from "../controllers/sts";

const router = express.Router();

router.route("/create").post(addSTS); // add permission
router.route("/").get(getAllSTS);
router.route("/:stsId").get(getSTSById);
router.route("/:stsId").put(updateSTS); // add permission
router.route("/:stsId").delete(deleteSTS); // add permision

export default router;

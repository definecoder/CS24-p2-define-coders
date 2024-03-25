import express from "express";
import {
  addSTS,
  deleteSTS,
  getAllSTS,
  getSTSById,
  updateSTS,
} from "../controllers/sts";

const router = express.Router();

router.route("/create").post(addSTS);
router.route("/").get(getAllSTS);
router.route("/:stsId").get(getSTSById);
router.route("/:stsId").put(updateSTS);
router.route("/:stsId").delete(deleteSTS);

export default router;

import express from "express";
import {
  addlandfill,
  deleteLandfill,
  getAllLandfills,
  getLandfillById,
  updateLandfill,
} from "../controllers/landfills";

const router = express.Router();

router.route("/create").post(addlandfill);
router.route("/").get(getAllLandfills);
router.route("/:landfillId").get(getLandfillById);
router.route("/:landfillId").put(updateLandfill);
router.route("/:landfillId").delete(deleteLandfill);

export default router;

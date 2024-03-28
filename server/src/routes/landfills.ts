import express from "express";
import {
  addlandfill,
  deleteLandfill,
  getAllLandfills,
  getLandfillById,
  updateLandfill,
} from "../controllers/landfills";

const router = express.Router();

router.route("/create").post(addlandfill); // add permission
router.route("/").get(getAllLandfills);
router.route("/:landfillId").get(getLandfillById);
router.route("/:landfillId").put(updateLandfill); //  add permission
router.route("/:landfillId").delete(deleteLandfill); // add permision

export default router;

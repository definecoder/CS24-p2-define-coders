import { get } from "http";
import express from "express";
import {
  addContractor,
  deleteContractor,
  getAllContractors,
  getContractorById,
  updateContractor,
} from "../controllers/contractor";
const router = express.Router();

router.route("/create").post(addContractor);
router.route("/").get(getAllContractors);
router
  .route("/:contractorId")
  .get(getContractorById)
  .put(updateContractor)
  .delete(deleteContractor);

export default router;

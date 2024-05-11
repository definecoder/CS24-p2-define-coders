import express from "express";
const router = express.Router();

import {
  generateBillFortheWeek,
  getAllContractorBills,
  getContractorBillById,
} from "../controllers/contractorBills";

router.route("/generate").post(generateBillFortheWeek);
router.route("/").get(getAllContractorBills);
router.route("/:contractorBillId").get(getContractorBillById);

export default router;

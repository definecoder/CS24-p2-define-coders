import express from "express";
const router = express.Router();

import {
  addContractorEntry,
  getAllContractorEntries,
  getContractorEntryById,
} from "../controllers/stsContractorEntry";

router.route("/create").post(addContractorEntry);
router.route("/all").get(getAllContractorEntries);
router.route("/:id").get(getContractorEntryById);

export default router;

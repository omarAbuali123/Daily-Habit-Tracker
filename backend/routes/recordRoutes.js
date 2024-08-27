const express = require("express");
const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  softDeleteRecord,
} = require("../controllers/recordController");

const router = express.Router();

router.post("/save", createRecord);
router.get("/", getRecords);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);
router.put("/soft-delete/:id", softDeleteRecord);

module.exports = router;

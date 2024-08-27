const Record = require("../models/Record");

// Create a new record
const createRecord = async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all records
const getRecords = async (req, res) => {
  try {
    const records = await Record.find({ isDeleted: false });
    res.status(200).json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a record
const updateRecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a record
const deleteRecord = async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Record deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft Delete a record
const softDeleteRecord = async (req, res) => {
  try {
    const softDeletedRecord = await Record.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    res.status(200).json(softDeletedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  softDeleteRecord,
};

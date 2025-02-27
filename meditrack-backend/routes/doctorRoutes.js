const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Create Doctor
router.post('/add', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.json({ message: "Doctor added successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Doctors
router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// Delete Doctor
router.delete('/:id', async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor deleted successfully!" });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Create Patient
router.post('/add', async (req, res) => {
  try {
    const { name, age, contact, medicalHistory } = req.body;

    // Validate required fields
    if (!name || !age || !contact || !medicalHistory) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Create new patient
    const newPatient = new Patient({ name, age, contact, medicalHistory });
    await newPatient.save();
    res.status(201).json({ message: "Patient added successfully!", patient: newPatient });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients." });
  }
});

// Delete Patient
router.delete('/:id', async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }
    res.json({ message: "Patient deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting patient." });
  }
});

module.exports = router;

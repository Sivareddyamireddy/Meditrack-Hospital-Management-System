const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Schedule Appointment
router.post('/schedule', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.json({ message: "Appointment scheduled successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Appointments
router.get('/', async (req, res) => {
  const appointments = await Appointment.find().populate('patient doctor');
  res.json(appointments);
});

// Update Appointment Status
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  await Appointment.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Appointment updated successfully!" });
});

// Delete Appointment
router.delete('/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Appointment deleted successfully!" });
});

module.exports = router;

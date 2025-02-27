const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  contact: { type: String, required: true },
  medicalHistory: { type: String, default: "No history" },
});

module.exports = mongoose.model('Patient', PatientSchema);

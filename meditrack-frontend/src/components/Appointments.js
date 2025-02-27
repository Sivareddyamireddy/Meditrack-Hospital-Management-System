import React, { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${backendUrl}/appointments`);
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${backendUrl}/patients`);
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${backendUrl}/doctors`);
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const scheduleAppointment = async () => {
    if (!patient || !doctor || !date) {
      alert("Please select a patient, doctor, and date.");
      return;
    }
    try {
      await axios.post(`${backendUrl}/appointments/schedule`, {
        patient,
        doctor,
        date,
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error scheduling appointment:", error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${backendUrl}/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="container">
      <h2>Appointments</h2>
      Select Patient
      <select onChange={(e) => setPatient(e.target.value)}>
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>
      Select Doctor
      <select onChange={(e) => setDoctor(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </select>
      Select Date
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={scheduleAppointment}>Schedule</button>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {appt.patient?.name || "Unknown Patient"} -{" "}
            {appt.doctor?.name || "Unknown Doctor"} -{" "}
            {appt.date ? new Date(appt.date).toLocaleDateString() : "No Date"}
            <button className="delete" onClick={() => deleteAppointment(appt._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;

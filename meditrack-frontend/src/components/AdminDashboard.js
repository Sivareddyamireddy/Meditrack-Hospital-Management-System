import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // Add CSS styles
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  // Fetch Data
  const fetchPatients = async () => {
    const res = await axios.get(`${backendUrl}/patients`);
    setPatients(res.data);
  };

  const fetchDoctors = async () => {
    const res = await axios.get(`${backendUrl}/doctors`);
    setDoctors(res.data);
  };

  const fetchAppointments = async () => {
    const res = await axios.get(`${backendUrl}/appointments`);
    setAppointments(res.data);
  };

  // Delete Functions
  const deletePatient = async (id) => {
    await axios.delete(`${backendUrl}/patients/${id}`);
    fetchPatients();
  };

  const deleteDoctor = async (id) => {
    await axios.delete(`${backendUrl}/doctors/${id}`);
    fetchDoctors();
  };

  const deleteAppointment = async (id) => {
    await axios.delete(`${backendUrl}/appointments/${id}`);
    fetchAppointments();
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {/* Statistics */}
      <div className="stats">
        <div className="stat-box">Total Patients: {patients.length}</div>
        <div className="stat-box">Total Doctors: {doctors.length}</div>
        <div className="stat-box">Total Appointments: {appointments.length}</div>
      </div>

      {/* Patients Section */}
      <h2>Patients</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>
                <button className="delete" onClick={() => deletePatient(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Doctors Section */}
      <h2>Doctors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.specialty}</td>
              <td>
                <button className="delete" onClick={() => deleteDoctor(d._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Appointments Section */}
      <h2>Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id}>
              <td>{appt.patient?.name || "Unknown"}</td>
              <td>{appt.doctor?.name || "Unknown"}</td>
              <td>{new Date(appt.date).toLocaleDateString()}</td>
              <td>
                <button className="delete" onClick={() => deleteAppointment(appt._id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default AdminDashboard;

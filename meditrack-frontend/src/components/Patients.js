import React, { useEffect, useState } from 'react';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL; // Use Environment Variable

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${backendUrl}/patients`);
      setPatients(res.data);
    } catch (error) {
      console.error('Error fetching patients:', error.message);
    }
  };

  const addPatient = async () => {
    if (!name || !age || !contact || !medicalHistory) {
      alert('All fields are required!');
      return;
    }
    try {
      await axios.post(`${backendUrl}/patients/add`, { name, age, contact, medicalHistory });
      fetchPatients();
      setName('');
      setAge('');
      setContact('');
      setMedicalHistory('');
    } catch (error) {
      console.error('Error adding patient:', error.message);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`${backendUrl}/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error.message);
    }
  };

  return (
    <div>
      <h2>Patients</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
      <input type="text" placeholder="Medical History" value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} required />
      <button onClick={addPatient}>Add Patient</button>

      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            {patient.name} - {patient.age} - {patient.contact}
            <button onClick={() => deletePatient(patient._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;

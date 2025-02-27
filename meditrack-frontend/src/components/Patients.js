import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await axios.get('http://localhost:5000/patients');
    setPatients(res.data);
  };

  const addPatient = async () => {
    await axios.post('http://localhost:5000/patients/add', { name, age, contact, medicalHistory });
    fetchPatients();
  };

  const deletePatient = async (id) => {
    await axios.delete(`http://localhost:5000/patients/${id}`);
    fetchPatients();
  };

  return (
    <div>
      <h2>Patients</h2>
        Enter Patient Name<input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        Enter Patient Age<input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} required />
        Enter Patient Contact no<input type="text" placeholder="Contact" onChange={(e) => setContact(e.target.value)} required />
        Enter Patient Medical History<input type="text" placeholder="Medical History" onChange={(e) => setMedicalHistory(e.target.value)} required />
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

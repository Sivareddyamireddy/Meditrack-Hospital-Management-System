import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await axios.get('http://localhost:5000/doctors');
    setDoctors(res.data);
  };

  const addDoctor = async () => {
    await axios.post('http://localhost:5000/doctors/add', { name, specialty, contact });
    fetchDoctors();
  };

  const deleteDoctor = async (id) => {
    await axios.delete(`http://localhost:5000/doctors/${id}`);
    fetchDoctors();
  };

  return (
    <div>
      <h2>Doctors</h2>
      Enter Doctor Name<input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      Enter Specialization<input type="text" placeholder="Specialty" onChange={(e) => setSpecialty(e.target.value)} />
      Enter Contact<input type="text" placeholder="Contact" onChange={(e) => setContact(e.target.value)} />
      <button onClick={addDoctor}>Add Doctor</button>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            {doctor.name} - {doctor.specialty} - {doctor.contact}
            <button onClick={() => deleteDoctor(doctor._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;

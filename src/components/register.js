// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQRCode from 'react-qr-code';
import { firestore, realtimeDatabase } from './Firebase';
import { doc, setDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    idNumber: '',
    password: '',
  });
  const [serialNumber, setSerialNumber] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateSerialNumber = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    let serialNumber;
    let unique = false;

    while (!unique) {
      serialNumber = Math.floor(10000000 + Math.random() * 90000000);
      unique = !existingUsers.some((user) => user.serialNumber === serialNumber);
    }
    return serialNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.age || !formData.idNumber || !formData.password) {
      setError('All fields are required!');
      return;
    }

    if (formData.age <= 0) {
      setError('Please enter a valid age.');
      return;
    }

    const userSerialNumber = generateSerialNumber();
    setSerialNumber(userSerialNumber);

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: Number(formData.age),
      idNumber: formData.idNumber,
      password: formData.password,
      serialNumber: userSerialNumber,
      verified: false,
    };

    try {
      // Save to Firestore
      await setDoc(doc(firestore, "register", userSerialNumber.toString()), userData);

      // Save to Realtime Database
      await set(ref(realtimeDatabase, `register/${userSerialNumber}`), userData);

      // Generate QR code data and save it to localStorage
      const qrCodeData = JSON.stringify({ serialNumber: userSerialNumber });
      localStorage.setItem('qrCodeData', qrCodeData);

      alert('Registration successful!');
      navigate('components/login');
    } catch (error) {
      console.error("Error saving user data:", error);
      setError("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div>
          <label>ID Number:</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>

      {serialNumber && (
        <div style={{ marginTop: '20px' }}>
          <p>Serial Number: {serialNumber}</p>
          <div>
            <ReactQRCode value={JSON.stringify({ serialNumber })} size={128} />
          </div>
        </div>
      )}

      <button onClick={() => navigate('components/login')} style={{ marginTop: '10px' }}>
        Already have an account?
      </button>
    </div>
  );
};

export default Register;

import React, { useState, useEffect } from 'react';
import ReactQRCode from 'react-qr-code';  // Import the QR code library
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [serialNumber, setSerialNumber] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the QR code data from localStorage
    const qrDataFromStorage = localStorage.getItem('qrCodeData');
    if (qrDataFromStorage) {
      // If QR code data exists, parse it and set the serial number, first name, last name, and QR code data
      const parsedData = JSON.parse(qrDataFromStorage);
      setSerialNumber(parsedData.serialNumber);  // Set serial number
      setQrCodeData(parsedData); // Store the whole object
      setFirstName(parsedData.firstName);  // Set first name
      setLastName(parsedData.lastName);    // Set last name
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInIdNumber');
    navigate('components/login');
  };

  return (
    <div>
      <h2>Welcome Home</h2>
      
      {/* If QR data is available, display the serial number, first name, last name, and QR code */}
      {serialNumber && qrCodeData ? (
        <>
          <p><strong>Serial Number:</strong> {serialNumber}</p>
          <h4>Your QR Code:</h4>
          <ReactQRCode value={JSON.stringify(qrCodeData)} size={256} />
        </>
      ) : (
        <p>Loading your data...</p>
      )}

      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

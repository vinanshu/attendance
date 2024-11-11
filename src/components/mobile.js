import React, { useState } from 'react';
import QRScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const Mobile = () => {
  const [scanResult, setScanResult] = useState('');
  const [message, setMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      const scannedData = JSON.parse(data.text);

      if (scannedData.serialNumber) {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = existingUsers.find(user => user.serialNumber === scannedData.serialNumber);

        if (user) {
          setMessage('Scan successful!');
          setUserData({
            firstName: user.firstName,
            lastName: user.lastName,
          });

          // Get current date and time when scanning
          const today = new Date();
          const day = today.getDate();
          const month = today.getMonth() + 1; // Month is zero-based
          const year = today.getFullYear();
          const currentDate = `${day}/${month}/${year}`;

          let hours = today.getHours();
          const minutes = today.getMinutes();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12; // Convert to 12-hour format
          hours = hours ? hours : 12; // The hour '0' should be '12'
          const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
          const time = `${hours}:${strMinutes} ${ampm}`;

          // Push student details with timestamp to localStorage
          const timestampData = JSON.parse(localStorage.getItem('timestamps')) || [];
          timestampData.push({
            firstName: user.firstName,
            lastName: user.lastName,
            serialNumber: scannedData.serialNumber,
            date: currentDate,
            time: time,
          });

          localStorage.setItem('timestamps', JSON.stringify(timestampData));

          // Optionally, navigate to the TimestampPage after scan
        } else {
          setMessage('User not found!');
        }
      } else {
        setMessage('Invalid QR code!');
      }
      setScanResult(data.text);
      setIsScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const toggleScanner = () => {
    setIsScanning(!isScanning);
    setMessage('');
    setScanResult('');
    setUserData(null);
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      {isScanning ? (
        <QRScanner
          delay={300}
          style={{ width: '50%', height: '50%' }}
          onError={handleError}
          onScan={handleScan}
        />
      ) : (
        <button onClick={toggleScanner}>Start Scanning</button>
      )}

      <div style={{ marginTop: '20px' }}>
        <p>Scan Result: {scanResult}</p>
        <p>{message}</p>
      </div>

      {userData && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
        </div>
      )}
    </div>
  );
};

export default Mobile;

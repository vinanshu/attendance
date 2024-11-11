// TimestampPage.js
import React, { useState, useEffect } from 'react';

const TimestampPage = () => {
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const storedTimestamps = JSON.parse(localStorage.getItem('timestamps')) || [];
    setTimestamps(storedTimestamps);
  }, []);

  return (
    <div>
      <h2>Student Scan Timestamps</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Serial Number</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {timestamps.map((timestamp, index) => (
            <tr key={index}>
              <td>{timestamp.firstName}</td>
              <td>{timestamp.lastName}</td>
              <td>{timestamp.serialNumber}</td>
              <td>{timestamp.date}</td>
              <td>{timestamp.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimestampPage;

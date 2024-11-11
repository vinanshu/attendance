// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/Home";
import Admins from "./components/Admins";
import Mobile from "./components/mobile";
import RegDetails from "./components/regdetails";
import TimestampPage from './components/TimestampPage'; // Import TimestampPage

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admins" element={<Admins />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/regdetails" element={<RegDetails />} />
        <Route path="/timestampPage" element={<TimestampPage />} /> {/* Add TimestampPage */}

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

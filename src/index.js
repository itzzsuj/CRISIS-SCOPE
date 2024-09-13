import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainContent from './components/MainContent';
import UserDashboard from './user/UserDashboard';
import Login from "./loginpage/Login"; // Ensure correct path to Login component
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/home" element={<MainContent/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/userDashboard" element={<UserDashboard/>} />
    </Routes>
  </BrowserRouter>
);

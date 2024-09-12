import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainContent from './components/MainContent';
import Login from "./loginpage/Login"; // Ensure correct path to Login component
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainContent from './components/MainContent';
import UserDashboard from './user/UserDashboard';
import FoodRequest from './user/FoodRequest';
import RescueRequest from './user/RescueRequest';
import AidRequest from './user/AidRequest';
import UploadMedia from './user/UploadMedia';
import RescueDashboard from './rescue/RescueDashboard';
import AdminDashboard from './admin/AdminDashboard';
import Login from "./loginpage/Login"; // Ensure correct path to Login component
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/home" element={<MainContent/>}/>
      <Route path="/RescueDashboard" element={<RescueDashboard/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/userDashboard" element={<UserDashboard/>} />
      <Route path="/AidRequest" element={<AidRequest/>}/>
      <Route path="/FoodRequest" element={<FoodRequest/>}/>
      <Route path="/RescueRequest" element={<RescueRequest/>}/>
      <Route path="/UploadMedia" element={<UploadMedia/>}/>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
    </Routes>
  </BrowserRouter>
);

import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login';
import GeneralLoginPage from './pages/GeneralLogin';
import LandingPage from './pages/Landing';
import SignupPage from './pages/Signup';
import AdminPage from './pages/Admin';
import User from './User';

export default function Router() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/generallogin" element={<GeneralLoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<User />} />
        <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import GeneralLoginPage from './pages/GeneralLogin';
import LandingPage from './pages/Landing';
import SignupPage from './pages/Signup';
import AdminPage from './pages/Admin'; // 관리자 첫 페이지
import User from './User';  // 일반 사용자 페이지
import Admin from './Admin';  // 관리자 전용 페이지

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 일반 사용자 페이지 */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/generallogin" element={<GeneralLoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<User />} />

        {/* 관리자 페이지 */}
        <Route path="/admin" element={<AdminPage />} />  {/* 기본 관리자 페이지 */}
        <Route path="/admin/*" element={<Admin />} />  {/* 관리자 서브 라우트 처리 */}
      </Routes>
    </BrowserRouter>
  );
}

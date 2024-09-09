import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import AdminNavbar from './components/AdminNav/AdminNavbar';  // 관리자용 내비게이션 바
import Footer from './components/Footer/Footer';
import ClientPage from './pages/Client';
import StatPage from './pages/Stat';
import AdminNoticePage from './pages/AdminNotice';
import AdminInquiryPage from './pages/AdminInquiry';

export default function Admin() {
  return (
    <div>
     {/* <AdminNavbar />  관리자 페이지용 내비게이션 바 */}
      <Routes>
      <Route path="/admin/client" element={<ClientPage />} />
        <Route path="/admin/adminnotice" element={<AdminNoticePage />} />
        <Route path="/admin/admininquiry" element={<AdminInquiryPage />} /> 
        <Route path="/admin/stat" element={<StatPage />} /> 
      </Routes>
      <Footer />
    </div>
  );
}

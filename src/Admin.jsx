import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNav from './components/AdminNav/AdminNav'; 
import Footer from './components/Footer/Footer';
import ClientPage from './pages/Client';
import StatPage from './pages/Stat';
import AdminNoticePage from './pages/AdminNotice';
import AdminInquiryPage from './pages/AdminInquiry';
import NoticeCreatePage from './pages/NoticeCreate';
import AdminNoticeDetailPage from './pages/AdminNoticeDetail';
import AdminInquiryDetailPage from './pages/AdminInquiryDetail';
export default function Admin() {
  return (
    <div>
      {/* 관리자 전용 네비게이션 바 */}
      <AdminNav /> 
      <Routes>
        {/* 각 관리자 페이지로의 서브 라우트 설정 */}
        <Route path="client" element={<ClientPage />} />
        <Route path="adminnotice" element={<AdminNoticePage />} />
        <Route path="admininquiry" element={<AdminInquiryPage />} /> 
        <Route path="stat" element={<StatPage />} /> 
        <Route path="noticecreate" element={<NoticeCreatePage />} />
        <Route path="adminnoticedetail" element={<AdminNoticeDetailPage />} />
        <Route path="admininquirydetail" element={<AdminInquiryDetailPage />} />
      </Routes>
    </div>
  );
}

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNav from './components/AdminNav/AdminNav'; 
import Footer from './components/Footer/Footer';
import ClientManagementPage from './pages/ClientManagement';
import StatPage from './pages/Stat';
import AdminNoticePage from './pages/AdminNotice';
import AdminInquiryPage from './pages/AdminInquiry';
import NoticeCreatePage from './pages/NoticeCreate';
import AdminNoticeDetailPage from './pages/AdminNoticeDetail';
import AdminInquiryDetailPage from './pages/AdminInquiryDetail';
import ProductCreatePage from './pages/ProductCreate';
import CheckOrderPage from './pages/CheckOrder';

export default function Admin() {
  return (
    <div>
      {/* 관리자 전용 네비게이션 바 */}
      <AdminNav /> 
      <Routes>
        {/* 각 관리자 페이지로의 서브 라우트 설정 */}
        <Route path="clientManagement" element={<ClientManagementPage />} />
        <Route path="adminnotice" element={<AdminNoticePage />} />
        <Route path="noticecreate" element={<NoticeCreatePage />} />
        <Route path="adminnoticedetail" element={<AdminNoticeDetailPage />} />
        <Route path="stat" element={<StatPage />} /> 
        <Route path="admininquiry" element={<AdminInquiryPage />} /> 
        <Route path="admininquirydetail" element={<AdminInquiryDetailPage />} />
        <Route path="productcreate" element={<ProductCreatePage />} /> 
        <Route path="checkorder" element={<CheckOrderPage />} />
      </Routes>
    </div>
  );
}

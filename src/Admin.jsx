import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNav from './components/AdminNav/AdminNav'; 
import ClientManagementPage from './pages/ClientManagement';
import StatPage from './pages/Stat';
import AdminNoticePage from './pages/AdminNotice';
import NoticeCreatePage from './pages/NoticeCreate';
import AdminNoticeDetailPage from './pages/AdminNoticeDetail';
import ProductCreatePage from './pages/ProductCreate';
import CheckOrderPage from './pages/CheckOrder';
import Headset from './components/Admin/ProductList/Headset';
import PhoneAmplifier from './components/Admin/ProductList/PhoneAmplifier';
import LineCord from './components/Admin/ProductList/LineCord';
import Recording from './components/Admin/ProductList/Recording';
import Accessory from './components/Admin/ProductList/Accessory';
import AdminProductDetailPage from './pages/AdminProductDetail';
import AdminOrderListPage from './pages/AdminOrderList';

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
        <Route path="productcreate" element={<ProductCreatePage />} /> 
        <Route path="checkorder" element={<CheckOrderPage />} />
        <Route path="headset" element={<Headset />} />
        <Route path="phoneAmplifier" element={<PhoneAmplifier />} />
        <Route path="lineCord" element={<LineCord />} />
        <Route path="recording" element={<Recording />} />
        <Route path="accessory" element={<Accessory />} />
        <Route path="adminproductdetail" element={<AdminProductDetailPage />} /> 
        <Route path="adminorderlist" element={<AdminOrderListPage />} />
      </Routes>
    </div>
  );
}

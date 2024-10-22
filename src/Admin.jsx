import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNav from './components/AdminNav/AdminNav'; 
import ClientManagementPage from './pages/ClientManagement';
import ClientDetail from './components/Admin/ClientDetail';
import StatPage from './pages/Stat';
import AdminNoticePage from './pages/AdminNotice';
import NoticeCreatePage from './pages/NoticeCreate';
import AdminNoticeDetailPage from './pages/AdminNoticeDetail';
import AdminNoticeEditPage from './pages/AdminNoticeEdit';
import ProductCreatePage from './pages/ProductCreate';
import Headset from './components/Admin/ProductList/Headset';
import LineCord from './components/Admin/ProductList/LineCord';
import Recording from './components/Admin/ProductList/Recording';
import Accessory from './components/Admin/ProductList/Accessory';
import AdminProductDetailPage from './pages/AdminProductDetail';
import AdminOrderListPage from './pages/AdminOrderList';
import AddClientPage from './pages/AddClient';
import AdminProductEditPage from './pages/AdminProductEdit';
import ClientEditPage from'./pages/ClientEdit';
import ScrollToTop from './ScrollToTop';
import AdminSearchResult from './components/AdminNav/AdminSearchResult';

export default function Admin() {
  return (
    <div>
      {/* 관리자 전용 네비게이션 바 */}
      <AdminNav /> 
      <ScrollToTop />
      <Routes>
        {/* 각 관리자 페이지로의 서브 라우트 설정 */}
        <Route path="clientmanagement" element={<ClientManagementPage />} />
        <Route path="clientdetail/:clientId" element={<ClientDetail />} />
        <Route path="adminnotice" element={<AdminNoticePage />} />
        <Route path="noticecreate" element={<NoticeCreatePage />} />
        <Route path="adminnoticeedit/:noticeId" element={<AdminNoticeEditPage />} />
        <Route path="adminnoticedetail/:noticeId" element={<AdminNoticeDetailPage />} />
        <Route path="stat" element={<StatPage />} /> 
        <Route path="productcreate" element={<ProductCreatePage />} />
        <Route path="headset" element={<Headset />} />
        <Route path="lineCord" element={<LineCord />} />
        <Route path="recording" element={<Recording />} />
        <Route path="accessory" element={<Accessory />} />
        <Route path="adminproductdetail/:productId" element={<AdminProductDetailPage />} /> 
        <Route path="adminproductedit/:productId" element={<AdminProductEditPage />} />
        <Route path="adminorderlist" element={<AdminOrderListPage />} />
        <Route path="addclient" element={<AddClientPage />} />
        <Route path="clientedit/:clientId" element={<ClientEditPage />} />
        <Route path="adminsearch" element={<AdminSearchResult />} />
      </Routes>
    </div>
  );
}

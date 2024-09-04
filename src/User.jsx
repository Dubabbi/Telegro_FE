import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import NoticePage from './pages/Notice';
import NoticeDetailPage from './pages/NoticeDetail';
import InquiryFormPage from './pages/InquiryForm';
import InquiryDetailPage from './pages/InquiryDetail';
import OrderManagerPage from './pages/OrderManager';
import OrderReviewPage from './pages/OrderReview';
import AdminPage from './pages/Admin';
import ProductPage from './pages/Product';
import ClientPage from './pages/Client';
import AdminNoticePage from './pages/AdminNotice';
import AdminInquiryPage from './pages/AdminInquiry';


export default function User() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/noticedetail" element={<NoticeDetailPage />} />
        <Route path="/inquirydetail" element={<InquiryDetailPage />} />
        <Route path="/inquiryform" element={<InquiryFormPage />} />
        <Route path="/orderManager" element={<OrderManagerPage />} />
        <Route path="/orderReview" element={<OrderReviewPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/adminnotice" element={<AdminNoticePage />} />
        <Route path="/admininquiry" element={<AdminInquiryPage />} /> Product
      </Routes>
      <Footer />
    </div>
  );
}

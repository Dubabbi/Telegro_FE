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
      </Routes>
      <Footer />
    </div>
  );
}

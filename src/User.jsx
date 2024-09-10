import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';
import NotificationBar from './components/NotificationBar/NotificationBar';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import NoticePage from './pages/Notice';
import NoticeDetailPage from './pages/NoticeDetail';
import InquiryFormPage from './pages/InquiryForm';
import InquiryDetailPage from './pages/InquiryDetail';
import OrderReviewPage from './pages/OrderReview';
import ProductPage from './pages/Product';
import OrderPage from './pages/Order';
import OrderProductPage from './pages/OrderProduct';
import CheckPage from './pages/Check';
import Headset from './components/Check/Headset';
import PhoneAmplifier from './components/Check/PhoneAmplifier';
import LineCord from './components/Check/LineCord';
import Recording from './components/Check/Recording';
import Accessory from './components/Check/Accessory';
import ProductDetailPage from './pages/ProductDetail';
import ChatButton from './components/ChatButton/ChatButton';
import OrderManagerPage from './pages/OrderManager';

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
        <Route path="/orderProduct" element={<OrderProductPage />} />
        <Route path="/orderReview" element={<OrderReviewPage />} />
        <Route path="/admin/product" element={<ProductPage />} />
        <Route path="/productdetail" element={<ProductDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/check" element={<CheckPage />} />
        <Route path="/headset" element={<Headset />} />
        <Route path="/phoneAmplifier" element={<PhoneAmplifier />} />
        <Route path="/lineCord" element={<LineCord />} />
        <Route path="/recording" element={<Recording />} />
        <Route path="/accessory" element={<Accessory />} />
        <Route path="/ordermanager" element={<OrderManagerPage />} />
      </Routes>
      <NotificationBar />
      <ChatButton />
      <Footer />
    </div>
  );
}

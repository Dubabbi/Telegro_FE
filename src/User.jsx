import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';
import NotificationBar from './components/NotificationBar/NotificationBar';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import NoticePage from './pages/Notice';
import NoticeDetailPage from './pages/NoticeDetail';
import OrderPage from './pages/Order';
import OrderProductPage from './pages/OrderProduct';
import OrderProcessPage from './components/OrderProcess/OrderProcess';
import Headset from './components/Check/Headset';
import LineCord from './components/Product/LineCord';
import Recording from './components/Product/Recording';
import Accessory from './components/Product/Accessory';
import ProductDetailPage from './pages/ProductDetail';
import ChatButton from './components/ChatButton/ChatButton';
import OrderManagerPage from './pages/OrderManager';
import NoticePopup from './components/NoticePopup/NoticePopup';
import CartPage from './pages/Cart';

export default function User() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/noticedetail" element={<NoticeDetailPage />} />
        <Route path="/orderProduct" element={<OrderProductPage />} />
        <Route path="/productdetail" element={<ProductDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/headset" element={<Headset />} />
        <Route path="/lineCord" element={<LineCord />} />
        <Route path="/recording" element={<Recording />} />
        <Route path="/accessory" element={<Accessory />} />
        <Route path="/ordermanager" element={<OrderManagerPage />} />
        <Route path="/orderprocess" element={<OrderProcessPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <NotificationBar />
      <NoticePopup />
      <ChatButton />
      <Footer />
    </div>
  );
}

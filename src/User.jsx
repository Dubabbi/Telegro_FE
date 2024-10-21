import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ResponseNav from './components/Nav/ResponseNav';
import Footer from './components/Footer/Footer';
import NotificationBar from './components/NotificationBar/NotificationBar';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import NoticePage from './pages/Notice';
import NoticeDetailPage from './pages/NoticeDetail';
import OrderPage from './pages/Order';
import OrderProductPage from './pages/OrderProduct';
import OrderProcessPage from './components/OrderProcess/OrderProcess';
import Headset from './components/Product/Headset';
import LineCord from './components/Product/LineCord';
import Recording from './components/Product/Recording';
import Accessory from './components/Product/Accessory';
import ProductDetailPage from './pages/ProductDetail';
import ChatButton from './components/ChatButton/ChatButton';
import OrderManagerPage from './pages/OrderManager';
import NoticePopup from './components/NoticePopup/NoticePopup';
import CartPage from './pages/Cart';
import ScrollToTop from './ScrollToTop';
import MypagePage from './pages/Mypage';
import SearchResult from './components/Nav/SearchResult';
import CompleteOrder from './components/OrderProcess/CompleteOrder';

export default function User() {
  return (
    <div>
      <ResponseNav />
      <ScrollToTop />
      <Routes>
      <Route path="/search" element={<SearchResult />} />
      <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/noticedetail/:noticeId" element={<NoticeDetailPage />} />
        <Route path="/orderProduct" element={<OrderProductPage />} />
        <Route path="/productdetail/:productId" element={<ProductDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/headset" element={<Headset />} />
        <Route path="/lineCord" element={<LineCord />} />
        <Route path="/recording" element={<Recording />} />
        <Route path="/accessory" element={<Accessory />} />
        <Route path="/ordermanager" element={<OrderManagerPage />} />
        <Route path="/orderprocess" element={<OrderProcessPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/mypage" element={<MypagePage />} />
        <Route path = "/completeorder" element={<CompleteOrder/>} />
      </Routes>
      <NotificationBar />
      <NoticePopup />
      <ChatButton />
      <Footer />
    </div>
  );
}

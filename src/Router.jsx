import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import NoticePage from './pages/Notice';


export default function Router() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notice" element={<NoticePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import WorkPage from './pages/WorkPage';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import ProjectDetail from './pages/ProjectDetail';
import Header from './components/Header';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './common/PageTransition';
import './App.css';

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Header /><Home /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Header /><WorkPage /></PageTransition>} />
        <Route path="/work/:slug" element={<PageTransition><Header /><ProjectDetail /></PageTransition>} />
        <Route path="/about" element={<PageTransition><Header /><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Header /><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

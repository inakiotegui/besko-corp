import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DevBar from './components/DevBar';
import ScrollToTop from './components/ScrollToTop';

import Landing from './sections/index';

import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { language } = useLanguage();
  useEffect(() => {
    const el = document.documentElement;
    el.lang = language;
  }, [language]);

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
      <DevBar />
      <ScrollToTop />
    </div>
  );
}

import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
//import Footer from './components/Footer';
// import WhatsappButton from './components/WhatsappButton';
// import ScrollToTop from './components/ScrollToTop';

import Landing from './sections/index';

import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { language } = useLanguage();
  useEffect(() => {
    const el = document.documentElement;
    el.lang = language;
    el.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      {/* <Footer /> */}
      {/* <WhatsappButton /> */}
      {/* <ScrollToTop /> */}
    </div>
  );
}

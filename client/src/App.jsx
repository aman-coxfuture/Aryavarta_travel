import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Booking from './pages/Booking';
import Enquiry from './pages/Enquiry';
import CircuitDetail from './pages/CircuitDetail';
import Policies from './pages/Policies';
import NotFound from './pages/NotFound';
import api from './api/axios'; // Backend API import

// Helper component to scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

export default function App() {
  
  // Website load hote hi Settings fetch karo
  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await api.get('/settings'); // Public route jo backend me banaya tha
        localStorage.setItem('siteSettings', JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed to load site settings. Using default values.", error);
      }
    };
    fetchGlobalSettings();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/circuits/:id" element={<CircuitDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}
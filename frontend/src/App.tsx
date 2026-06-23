import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Preloader from './components/Preloader';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to show the beautiful preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <Routes key="routes">
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

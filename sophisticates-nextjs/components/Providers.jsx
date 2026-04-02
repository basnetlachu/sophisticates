'use client';

import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';
import Cursor from './Cursor';
import FlowField from './FlowField';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="never">
        <FlowField />
        <div className="app-container">
          <div className="noise-overlay" />
          <Cursor />
          <Navbar />
          {children}
          <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

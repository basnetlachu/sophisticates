import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import { Privacy, Terms } from './components/LegalPages';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Greetings. I am SOPHISTICATES Chatbot, the Sophisticates protocol.\n\nHow can I assist you with enterprise architecture or technical integrations today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef(null);

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const fetchController = new AbortController();
    const fetchTimeout = setTimeout(() => fetchController.abort(), 20000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages.slice(-6) }),
        signal: fetchController.signal
      });
      clearTimeout(fetchTimeout);

      const data = await response.json();
      if (data.status === 'success') {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Protocol error. Please contact hello@sophisticatesai.com directly.' }]);
      }
    } catch (error) {
      clearTimeout(fetchTimeout);
      const msg = error?.name === 'AbortError'
        ? 'Request timed out. Please try again.'
        : 'Connection failed. Check your network and try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: 'clamp(16px, 4vh, 40px)',
        right: 'clamp(12px, 3vw, 40px)',
        zIndex: 9999
      }}>
        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="hover-target"
          style={{
            width: 'clamp(48px, 8vw, 64px)',
            height: 'clamp(48px, 8vw, 64px)',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
            cursor: 'none',
            position: 'relative',
            overflow: 'hidden',
            padding: 0
          }}
        >

          {/* Chat icon always visible */}
          <motion.img
            src="/chat-icon.webp"
            alt="Chat"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              zIndex: 1,
              filter: isOpen ? 'brightness(0.3)' : 'brightness(1)',
              transformOrigin: 'center center'
            }}
            initial={{ scale: 1.35 }}
            animate={{ scale: isOpen ? 1.35 : [1.35, 1.4, 1.35] }}
            transition={{ duration: 4, repeat: isOpen ? 0 : Infinity, ease: "easeInOut" }}
          />
          {/* X overlay when open */}
          {isOpen && (
            <span style={{
              position: 'relative',
              zIndex: 2,
              color: 'var(--text-main)',
              fontSize: '1.3rem',
              fontWeight: 300,
              lineHeight: 1
            }}>✕</span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="chat-container"
          >
            <div className="chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', background: '#00ff88', borderRadius: '50%', boxShadow: '0 0 10px #00ff88' }} />
                <div>
                  <div style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>PROTOCOL_SOPHIA</div>
                  <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)', letterSpacing: '0.05em' }}>INTELLIGENCE LAYER</div>
                </div>
              </div>
              <div style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'var(--text-dim)' }}>v2.0.4</div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="chat-message assistant" style={{ opacity: 0.5, fontFamily: 'monospace' }}>
                  ANALYZING REQUEST...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="INPUT COMMAND..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  padding: '12px 0',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace',
                  outline: 'none',
                  letterSpacing: '0.05em'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.55rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>ENT_KEY TO TRANSMIT</span>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: input.trim() ? 'var(--text-main)' : 'var(--text-dim)',
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    cursor: 'none',
                    letterSpacing: '0.1em'
                  }}
                >
                  EXECUTE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);

    // BATCH FIX: Googlebot / Crawler Detection for SEO
    // Googlebot takes static snapshots quickly and doesn't scroll, 
    // which leaves Framer Motion elements stuck at opacity: 0 and y: 50
    // This adds a global class so we can force them visible instantly for bots
    if (typeof window !== 'undefined') {
      const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
      if (isBot) {
        document.body.classList.add('is-bot');
      }
    }
  }, [pathname]);

  // Global mouse tracking for deep tech hover effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const panels = document.querySelectorAll('.glass-panel');
      for (let i = 0; i < panels.length; i++) {
        const rect = panels[i].getBoundingClientRect();
        panels[i].style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        panels[i].style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app-container">
      <div className="noise-overlay" />
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;

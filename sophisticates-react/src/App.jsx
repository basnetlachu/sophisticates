import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import About from './components/About';
import Research from './components/Research';
import Careers from './components/Careers';
import Partners from './components/Partners';
import PreviewVisuals from './components/PreviewVisuals';
import { Privacy, Terms } from './components/LegalPages';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ContactPage from './pages/ContactPage';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello. I am Athenaeum, the Sophisticates intelligence layer.\n\nI’m here to guide you through our work. How may I assist you today?"' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [collectingEmail, setCollectingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, collectingEmail]);

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
        let reply = data.reply;
        if (reply.includes('[COLLECT_EMAIL]')) {
          reply = reply.replace('[COLLECT_EMAIL]', '').trim();
          setCollectingEmail(true);
        }
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred. Please contact hello@sophisticatesai.com directly.' }]);
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

  const sendEmail = async () => {
    if (!emailInput.trim()) return;
    const emailAddr = emailInput.trim();
    setCollectingEmail(false);
    setEmailInput('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/athenaeum-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: emailAddr, messages })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setMessages(prev => [...prev, { role: 'assistant', content: `Your query has been sent to the Sophisticates team. They will reach you at ${emailAddr}. Is there anything else I can help with?` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Failed to send. Please reach us directly at hello@sophisticatesai.com.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Failed to send. Please reach us directly at hello@sophisticatesai.com.' }]);
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

  const baseInputStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border-color)',
    color: 'var(--text-main)',
    padding: '10px 0',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    fontWeight: 300,
    transition: 'border-color 0.3s ease'
  };

  return (
    <>
      {/* Toggle Button */}
      <div style={{ position: 'fixed', bottom: 'clamp(16px, 4vh, 40px)', right: 'clamp(12px, 3vw, 40px)', zIndex: 9999 }}>
        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          whileHover={{ scale: 1.05 }}
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
          <motion.img
            src="/chat-icon.webp"
            alt="Athenaeum"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', borderRadius: '50%', zIndex: 1,
              filter: isOpen ? 'brightness(0.3)' : 'brightness(1)',
              transformOrigin: 'center center'
            }}
            initial={{ scale: 1.35 }}
            animate={{ scale: isOpen ? 1.35 : [1.35, 1.4, 1.35] }}
            transition={{ duration: 4, repeat: isOpen ? 0 : Infinity, ease: 'easeInOut' }}
          />
          {isOpen && (
            <span style={{ position: 'relative', zIndex: 2, color: 'var(--text-main)', fontSize: '1.3rem', fontWeight: 300, lineHeight: 1 }}>✕</span>
          )}
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="chat-container"
          >
            {/* Header */}
            <div className="chat-header">
              <div>
                <div style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: 'var(--text-dim)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '5px' }}>
                  by Sophisticates
                </div>
                <div style={{ fontSize: '1.05rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)', fontWeight: 400, letterSpacing: '-0.02em' }}>
                  Athenaeum
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', background: '#00ff88', borderRadius: '50%', boxShadow: '0 0 8px #00ff88' }} />
                <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-message ${msg.role}`}
                  style={{ fontFamily: 'var(--font-body)', fontWeight: msg.role === 'assistant' ? 300 : 400, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
                >
                  {msg.content}
                </div>
              ))}

              {isLoading && (
                <div className="chat-message assistant" style={{ opacity: 0.45, fontFamily: 'var(--font-body)', fontWeight: 300, fontStyle: 'italic' }}>
                  Thinking...
                </div>
              )}

              {/* Email Collection Inline */}
              {collectingEmail && (
                <div style={{
                  padding: '16px 18px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--grid-line)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'var(--text-dim)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      Your email address
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontWeight: 300 }}>
                      Sophisticates will reply to you directly.
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') sendEmail(); }}
                      placeholder="you@example.com"
                      style={{ ...baseInputStyle, flex: 1 }}
                      autoFocus
                    />
                    <button
                      onClick={sendEmail}
                      disabled={!emailInput.trim()}
                      className="hover-target"
                      style={{
                        background: emailInput.trim() ? 'var(--text-main)' : 'transparent',
                        border: '1px solid var(--border-color)',
                        color: emailInput.trim() ? 'var(--bg-color)' : 'var(--text-dim)',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-body)',
                        cursor: emailInput.trim() ? 'none' : 'default',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        padding: '8px 16px',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap',
                        borderRadius: '1px'
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chat-input-area">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Athenaeum..."
                style={{ ...baseInputStyle, width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                  Enter to send
                </span>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="hover-target"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: input.trim() && !isLoading ? 'var(--text-main)' : 'var(--text-dim)',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-body)',
                    cursor: input.trim() ? 'none' : 'default',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s ease'
                  }}
                >
                  Send
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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof window !== 'undefined') {
      const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
      if (isBot) {
        document.body.classList.add('is-bot');
      }
    }
  }, [pathname]);

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
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/preview" element={<PreviewVisuals />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
      {pathname === '/' && <ChatWidget />}
    </div>
  );
}

export default App;

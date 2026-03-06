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

  // Auto-scroll to bottom when new messages arrive
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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages // send full history for context
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Protocol error. Please contact hello@sophisticatesai.com directly.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection failed. Check your network and try again.' }]);
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
      <motion.div
        style={{
          position: 'fixed',
          bottom: 'max(20px, 4vh)',
          right: 'max(20px, 4vw)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Radar Ping */}
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: 'clamp(55px, 15vw, 70px)',
            height: 'clamp(55px, 15vw, 70px)',
            borderRadius: '50%', backgroundColor: 'transparent',
            border: '1px solid var(--text-main)', zIndex: -1
          }}
        />
        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: 'clamp(55px, 15vw, 70px)',
            height: 'clamp(55px, 15vw, 70px)',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-color)', border: '1px solid rgba(255,255,255,0.2)',
            position: 'relative',
            cursor: 'auto', boxShadow: '0 0 20px rgba(0,0,0,0.8)',
            overflow: 'hidden', padding: 0, flexShrink: 0
          }}
        >
          <img src="/chat-icon.webp" alt="AI Protocol"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', bottom: '100px', right: 'max(10px, 4vw)',
              width: 'min(92vw, 380px)', height: 'min(75vh, 540px)',
              backgroundColor: 'rgba(5, 5, 5, 0.92)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              zIndex: 10000, display: 'flex', flexDirection: 'column',
              boxShadow: '0 30px 60px rgba(0,0,0,0.9)', borderRadius: '4px'
            }}
          >
            {/* Header */}
            <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '7px', height: '7px', backgroundColor: '#00ff88', borderRadius: '50%', boxShadow: '0 0 8px #00ff88' }}></div>
                <div>
                  <h4 style={{ margin: 0, fontSize: 'clamp(0.75rem, 3vw, 0.9rem)', color: '#fff', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.12em' }}>SOPHISTICATES CHATBOT</h4>
                  <p style={{ margin: 0, fontSize: 'clamp(0.5rem, 2vw, 0.6rem)', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginTop: '2px' }}>SECURE</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1 }}
                onMouseOver={e => e.target.style.color = '#fff'}
                onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>✕</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>SESSION INITIALIZED // {new Date().toLocaleTimeString()}</span>
              </div>

              {messages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  background: msg.role === 'user' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}`,
                  padding: '12px 14px', borderRadius: '3px'
                }}>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.85)', fontFamily: 'Space Grotesk, sans-serif', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </p>
                </div>
              ))}

              {isLoading && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 14px', borderRadius: '3px' }}>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>PROCESSING...</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px', flexShrink: 0 }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="INPUT COMMAND..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '11px 14px', color: '#fff', outline: 'none',
                  fontSize: '16px', fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '0.05em', borderRadius: '3px'
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button onClick={sendMessage} disabled={isLoading || !input.trim()}
                style={{
                  background: input.trim() && !isLoading ? '#fff' : 'rgba(255,255,255,0.15)',
                  color: input.trim() && !isLoading ? '#000' : 'rgba(255,255,255,0.4)',
                  border: 'none', padding: '0 18px', cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold', fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.75rem', letterSpacing: '0.1em', borderRadius: '3px',
                  transition: 'all 0.2s', flexShrink: 0
                }}>
                {isLoading ? '...' : 'SEND'}
              </button>
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
  }, [pathname]);

  return (
    <div className="app-container">
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

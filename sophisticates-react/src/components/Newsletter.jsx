import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleEarlyAccess = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('submitting');

        try {
            const response = await fetch('/api/early-access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section id="newsletter" className="section-padding" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div className="max-w-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    color: 'var(--text-main)',
                    marginBottom: '10px',
                    letterSpacing: '-0.02em',
                }}>
                    STAY AHEAD OF THE CURVE
                </h2>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', marginBottom: 'clamp(30px, 5vh, 40px)', maxWidth: '600px' }}>
                    Join the waitlist for exclusive first-wave access to our platform and updates on our frontier research.
                </p>

                <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    color: 'var(--text-main)',
                                    border: '1px solid var(--text-main)',
                                    padding: 'clamp(14px, 2vh, 18px) clamp(20px, 4vw, 30px)',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                                    width: '100%',
                                    backgroundColor: 'var(--bg-color)'
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>✓</span> ACCESS REQUEST RECEIVED
                            </motion.div>
                        ) : (
                            <motion.form
                                id="newsletter-form"
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleEarlyAccess}
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    position: 'relative',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-color)',
                                    overflow: 'hidden',
                                    transition: 'border-color 0.3s ease'
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--text-main)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                            >
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    required
                                    placeholder="ENTER EMAIL FOR EARLY ACCESS"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'submitting'}
                                    style={{
                                        flex: 1,
                                        padding: 'clamp(15px, 2vh, 20px) clamp(15px, 3vw, 20px)',
                                        paddingRight: 'clamp(90px, 25vw, 140px)',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'var(--text-main)',
                                        outline: 'none',
                                        fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
                                        fontFamily: 'Space Grotesk, sans-serif',
                                        letterSpacing: '0.1em',
                                        textOverflow: 'ellipsis'
                                    }}
                                />
                                <motion.button
                                    whileHover={{ backgroundColor: 'var(--text-main)', color: 'var(--bg-color)' }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    style={{
                                        position: 'absolute',
                                        right: '0',
                                        top: '0',
                                        bottom: '0',
                                        width: 'clamp(80px, 20vw, 130px)',
                                        background: 'transparent',
                                        border: 'none',
                                        borderLeft: '1px solid var(--border-color)',
                                        color: 'var(--text-main)',
                                        fontSize: 'clamp(0.65rem, 2vw, 0.9rem)',
                                        fontFamily: 'Space Grotesk, sans-serif',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold',
                                        transition: 'background-color 0.3s ease, color 0.3s ease'
                                    }}
                                >
                                    {status === 'submitting' ? '...' : (status === 'error' ? 'ERROR' : 'JOIN NOW')}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;

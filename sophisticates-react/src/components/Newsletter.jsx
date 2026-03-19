import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
    const isMobile = useMobile();

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
        <section id="newsletter" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: 'clamp(60px, 8vh, 100px)',
            paddingBottom: 'clamp(60px, 8vh, 100px)'
        }}>
            <div className="mesh-gradient-bg" style={{ opacity: 0.05, top: 'auto', bottom: '-50%' }} />

            <div className="max-w-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>

                <motion.div
                    initial={isMobile ? {} : { opacity: 0, y: 50 }}
                    animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                    <div className="section-label-wrapper" style={{ justifyContent: 'center' }}>
                        <div className="section-label-line" />
                        <span className="section-label">Priority Terminal</span>
                        <div className="section-label-line" />
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3rem, 6vw, 5.4rem)',
                        color: 'var(--text-main)',
                        marginBottom: '40px',
                        letterSpacing: '-0.07em',
                        lineHeight: '0.85',
                        fontWeight: 400
                    }}>
                        Stay <span className="text-accent" style={{ color: 'var(--text-dim)' }}>Frontier.</span>
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                        color: 'var(--text-muted)',
                        marginBottom: 'clamp(32px, 5vh, 60px)',
                        maxWidth: '640px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 300,
                        lineHeight: 1.6
                    }}>
                        Request priority placement for first-wave integration. Gain exclusive visibility into our frontier research and infrastructure releases.
                    </p>
                </motion.div>

                <div style={{ width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="glass-panel"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '20px',
                                    padding: 'clamp(20px, 4vw, 32px) clamp(24px, 8vw, 64px)',
                                    fontFamily: 'var(--font-body)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.3em',
                                    fontSize: '0.85rem',
                                    width: '100%',
                                    borderColor: 'var(--border-color)',
                                    fontWeight: 500,
                                    borderRadius: '2px'
                                }}
                            >
                                <span style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>✓</span> <span>Access_Granted</span>
                            </motion.div>
                        ) : (
                            <motion.form
                                id="newsletter-form"
                                key="form"
                                initial={isMobile ? {} : { opacity: 0, y: 30 }}
                                animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                onSubmit={handleEarlyAccess}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    width: '100%',
                                    position: 'relative',
                                    borderBottom: '1px solid var(--border-color)',
                                    background: 'transparent',
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    gap: '0'
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--text-main)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                            >
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    required
                                    placeholder="email@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'submitting'}
                                    className="hover-target"
                                    style={{
                                        flex: '1 1 200px',
                                        minWidth: 0,
                                        padding: 'clamp(20px, 4vh, 32px) 0',
                                        paddingRight: 'clamp(60px, 12vw, 180px)',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'var(--text-main)',
                                        outline: 'none',
                                        fontSize: 'clamp(0.95rem, 2vw, 1.4rem)',
                                        fontFamily: 'var(--font-body)',
                                        letterSpacing: '0.1em',
                                        fontWeight: 300
                                    }}
                                />
                                <motion.button
                                    whileHover={{ x: 10 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    style={{
                                        position: 'absolute',
                                        right: '0',
                                        top: '0',
                                        bottom: '0',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--text-main)',
                                        fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
                                        fontFamily: 'var(--font-body)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.3em',
                                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        opacity: 0.5,
                                        transition: 'opacity 0.4s',
                                        whiteSpace: 'nowrap',
                                        padding: '0'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                    onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
                                >
                                    {status === 'submitting' ? '...' : (status === 'error' ? 'Error' : 'Subscribe →')}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Aesthetic Detail */}
            <div style={{
                position: 'absolute', top: '20%', right: '-10%',
                fontSize: 'clamp(6rem, 20vw, 25rem)', fontFamily: 'var(--font-display)',
                color: 'var(--text-main)', opacity: 0.012, pointerEvents: 'none',
                lineHeight: 1, fontWeight: 700, transform: 'rotate(15deg)'
            }}>
                NODE
            </div>
        </section>
    );
};

export default Newsletter;

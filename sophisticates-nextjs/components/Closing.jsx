'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const EXPO = [0.16, 1, 0.3, 1];

const actions = [
    {
        index: '01',
        title: 'Early Access',
        desc: 'Get first-wave access to MEMOPT and future Sophisticates ventures as they launch.',
        cta: 'Request Access',
        target: 'newsletter',
    },
    {
        index: '02',
        title: 'Research',
        desc: 'Join our research network. Work on the hardest problems in AI, Quantum, Physics, and Robotics.',
        cta: 'Apply to Research',
        target: '/research',
    },
    {
        index: '03',
        title: 'Partnership',
        desc: 'If you represent an enterprise or institution with deep infrastructure challenges, reach out directly.',
        cta: 'Get in Touch',
        target: '/contact',
    },
];

const Closing = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isInView = useInView(ref, { once: true, margin: '-8% 0px' });
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [activeAction, setActiveAction] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('submitting');
        try {
            const res = await fetch('/api/early-access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            setStatus(res.ok ? 'success' : 'error');
            if (res.ok) setEmail('');
            if (!res.ok) setTimeout(() => setStatus('idle'), 3000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleActionClick = (action) => {
        if (action.target === 'newsletter') {
            setActiveAction('email');
            return;
        }
        if (action.target.startsWith('/')) {
            window.location.href = action.target;
            return;
        }
        const el = document.getElementById(action.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="closing" ref={ref} style={{
            background: 'var(--bg-color)',
            borderTop: '1px solid var(--border-color)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Top manifesto block */}
            <div style={{
                padding: 'clamp(80px, 14vh, 160px) 0 clamp(60px, 10vh, 120px)',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <div className="max-w-container">
                    <motion.div
                        initial={isMobile ? {} : { opacity: 0, y: 50 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.2, ease: EXPO }}
                        style={{ maxWidth: '1000px' }}
                    >
                        <div className="section-label-wrapper">
                            <div className="section-label-line" />
                            <span className="section-label">The Mission</span>
                        </div>

                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
                            fontWeight: 400,
                            color: 'var(--text-main)',
                            letterSpacing: '-0.05em',
                            lineHeight: 0.92,
                            margin: '0 0 clamp(32px, 5vh, 56px) 0',
                        }}>
                            Build what the world<br />
                            <span style={{ color: 'var(--text-dim)' }}>cannot yet imagine</span><br />
                            it needs.
                        </h2>

                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                            color: 'var(--text-muted)',
                            lineHeight: '1.7',
                            fontWeight: 300,
                            maxWidth: '620px',
                            margin: 0,
                        }}>
                            Every venture we build starts with a constraint the world has accepted as permanent. We treat it as an engineering problem. This is not incremental progress. It is the deliberate construction of capabilities that do not yet exist.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Three action paths */}
            <div className="max-w-container" style={{ padding: 'clamp(60px, 10vh, 120px) var(--container-padding)' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '0',
                    borderTop: '1px solid var(--border-color)',
                    borderLeft: '1px solid var(--border-color)',
                }}>
                    {actions.map((action, i) => (
                        <motion.div
                            key={i}
                            initial={isMobile ? {} : { opacity: 0, y: 30 }}
                            animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, ease: EXPO, delay: 0.1 + i * 0.1 }}
                            style={{
                                padding: 'clamp(32px, 5vw, 48px)',
                                borderRight: '1px solid var(--border-color)',
                                borderBottom: '1px solid var(--border-color)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '32px',
                                minHeight: '260px',
                            }}
                        >
                            <div>
                                <div style={{
                                    fontFamily: 'var(--font-accent)',
                                    fontSize: '0.6rem',
                                    color: 'var(--text-dim)',
                                    letterSpacing: '0.2em',
                                    marginBottom: '20px',
                                }}>
                                    {action.index}
                                </div>
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(1.4rem, 2vw, 2rem)',
                                    fontWeight: 400,
                                    color: 'var(--text-main)',
                                    letterSpacing: '-0.03em',
                                    margin: '0 0 16px 0',
                                    lineHeight: 1,
                                }}>
                                    {action.title}
                                </h3>
                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'clamp(0.85rem, 1vw, 1rem)',
                                    color: 'var(--text-muted)',
                                    lineHeight: '1.65',
                                    fontWeight: 300,
                                    margin: 0,
                                }}>
                                    {action.desc}
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                {activeAction === 'email' && i === 0 ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4, ease: EXPO }}
                                        onSubmit={handleSubmit}
                                        style={{
                                            borderBottom: '1px solid var(--border-color)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            paddingBottom: '12px',
                                        }}
                                    >
                                        {status === 'success' ? (
                                            <span style={{
                                                fontFamily: 'var(--font-body)',
                                                fontSize: '0.75rem',
                                                letterSpacing: '0.2em',
                                                textTransform: 'uppercase',
                                                color: 'var(--text-main)',
                                            }}>
                                                Access Requested
                                            </span>
                                        ) : (
                                            <>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    style={{
                                                        flex: 1,
                                                        background: 'transparent',
                                                        border: 'none',
                                                        outline: 'none',
                                                        color: 'var(--text-main)',
                                                        fontFamily: 'var(--font-body)',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 300,
                                                    }}
                                                />
                                                <button
                                                    type="submit"
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: 'var(--text-main)',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem',
                                                        padding: 0,
                                                    }}
                                                >
                                                    {status === 'submitting' ? '...' : '→'}
                                                </button>
                                            </>
                                        )}
                                    </motion.form>
                                ) : (
                                    <motion.button
                                        key="cta"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => handleActionClick(action)}
                                        className="hover-target"
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            padding: 0,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.7rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.25em',
                                            color: 'var(--text-main)',
                                            fontWeight: 500,
                                            width: 'fit-content',
                                            transition: 'opacity 0.3s ease',
                                        }}
                                        whileHover={{ x: 6 }}
                                        transition={{ duration: 0.3, ease: EXPO }}
                                    >
                                        {action.cta}
                                        <span style={{ fontSize: '1rem' }}>↗</span>
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Closing;

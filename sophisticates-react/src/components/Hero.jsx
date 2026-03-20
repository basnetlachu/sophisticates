import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';
import Abstract3D from './Abstract3D';

// Sharp expo easing — same feel as Linear, Vercel, Framer
const EXPO = [0.16, 1, 0.3, 1];

const Hero = () => {
    const ref = useRef(null);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

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
            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };
    const isMobile = useMobile();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

    const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const yShift     = useTransform(scrollYProgress, [0, 1],   [0, 60]);

    return (
        <section id="hero" ref={ref} style={{
            minHeight: '100svh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            background: 'var(--bg-color)',
            paddingTop: 'clamp(80px, 15vh, 160px)',
            paddingBottom: 'clamp(40px, 8vh, 80px)',
        }}>
            {/* Backgrounds */}
            <Abstract3D />
            <div className="bg-grid" />
            <div className="mesh-gradient-bg" />
            <div className="mesh-blob" style={{ top: '-10%', right: '5%', width: '50vw', height: '50vw', opacity: 0.8 }} />
            <div className="mesh-blob" style={{ bottom: '10%', left: '-15%', animationDelay: '-7s', width: '60vw', height: '60vw', opacity: 0.6 }} />

            <motion.div
                style={{
                    y: yShift,
                    opacity: opacityFade,
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '1600px',
                    margin: '0 auto',
                    padding: '0 clamp(20px, 5vw, 60px)',
                }}
            >
                {/* Micro-header label */}
                <motion.div
                    initial={isMobile ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(40px, 8vh, 80px)' }}
                >
                    <div className="hero-micro-header" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '40px', height: '1px', background: 'var(--text-main)' }} />
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--text-main)', fontWeight: 500 }}>
                            Sophisticates
                        </span>
                        <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-dim)', fontWeight: 400 }}>
                            · Deep Tech Venture Company
                        </span>
                    </div>
                </motion.div>

                {/* ── Main headline — each line clip-reveals upward ── */}
                <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'clamp(40px, 10vh, 100px)' }}>

                    {/* Line 1 */}
                    <div style={{ overflow: 'hidden' }}>
                        <motion.h1
                            initial={isMobile ? {} : { y: '105%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: 'clamp(2.4rem, 7vw, 6rem)',
                                lineHeight: 1.05,
                                letterSpacing: '-0.03em',
                                textAlign: 'left',
                                color: 'var(--text-main)',
                                fontWeight: 400,
                                margin: 0,
                                fontFamily: 'var(--font-display)',
                            }}
                        >
                            Clarity in <span style={{ color: 'var(--text-dim)' }}>Complexity.</span>
                        </motion.h1>
                    </div>

                    {/* Line 2 */}
                    <div style={{ overflow: 'hidden' }}>
                        <motion.h2
                            initial={{ y: '105%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 0.7, ease: EXPO, delay: 0.2 }}
                            style={{
                                fontSize: 'clamp(1.7rem, 4.5vw, 3.5rem)',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                textAlign: 'left',
                                color: 'var(--text-muted)',
                                fontWeight: 300,
                                margin: '4px 0 0 0',
                                fontFamily: 'var(--font-display)',
                            }}
                        >
                            Redefining Reality.
                        </motion.h2>
                    </div>

                    {/* Orienting sub-line */}
                    <div style={{ overflow: 'hidden', marginTop: 'clamp(14px, 2vh, 24px)' }}>
                        <motion.p
                            initial={isMobile ? {} : { y: '105%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 0.7, ease: EXPO, delay: 0.28 }}
                            style={{
                                fontSize: 'clamp(0.8rem, 1.1vw, 1rem)',
                                fontFamily: 'var(--font-body)',
                                color: 'var(--text-dim)',
                                fontWeight: 400,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                margin: 0,
                            }}
                        >
                            We build companies across AI · Quantum Computing · Robotics · Physics
                        </motion.p>
                    </div>

                    {/* Accent underline — draws from left */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.75, ease: EXPO, delay: 0.35 }}
                        style={{
                            height: '1px',
                            background: 'linear-gradient(90deg, var(--text-main), transparent)',
                            marginTop: 'clamp(16px, 2.5vh, 28px)',
                            transformOrigin: 'left',
                            maxWidth: '560px',
                        }}
                    />
                </div>

                {/* Bottom action row — original layout */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: EXPO, delay: 0.38 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                        gap: 'clamp(24px, 4vw, 40px)',
                        alignItems: 'flex-end',
                    }}
                >
                    {/* Left — description */}
                    <div style={{ maxWidth: '400px' }}>
                        <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)', color: 'var(--text-muted)', lineHeight: '1.7', fontFamily: 'var(--font-body)', fontWeight: 300, margin: 0 }}>
                            Sophisticates is a deep tech venture company. We build companies from scratch, each one engineered from first principles.
                            <br /><br />
                            Not a fund. Not a consultancy. We build ventures across <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>AI, Quantum Computing, Robotics, and Physics.</span> Each a deliberate bet on the hardest unsolved problems in science and engineering.
                        </p>
                    </div>

                    {/* Right — Inline email form */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifySelf: 'start', width: '100%', maxWidth: '420px' }}>
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        padding: 'clamp(16px, 2vh, 22px) 0',
                                        borderBottom: '1px solid var(--border-color)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.25em',
                                        color: 'var(--text-main)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                    }}
                                >
                                    <span>✓</span> Access Requested
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderBottom: '1px solid var(--border-color)',
                                        transition: 'border-color 0.3s ease',
                                        gap: '12px',
                                        paddingBottom: '2px',
                                        width: '100%',
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'}
                                    onBlur={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                                >
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        disabled={status === 'submitting'}
                                        style={{
                                            flex: 1,
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: 'var(--text-main)',
                                            fontFamily: 'var(--font-body)',
                                            fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                                            fontWeight: 300,
                                            padding: 'clamp(12px, 2vh, 18px) 0',
                                            letterSpacing: '0.02em',
                                        }}
                                    />
                                    <motion.button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--text-main)',
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.7rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.25em',
                                            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                                            opacity: status === 'submitting' ? 0.4 : 0.7,
                                            whiteSpace: 'nowrap',
                                            padding: '0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            flexShrink: 0,
                                            transition: 'opacity 0.2s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                        onMouseLeave={e => e.currentTarget.style.opacity = status === 'submitting' ? '0.4' : '0.7'}
                                    >
                                        {status === 'submitting' ? '...' : status === 'error' ? 'Try again' : 'Request Access →'}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                        <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.6rem',
                            color: 'var(--text-dim)',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            Priority access · No spam · Unsubscribe anytime
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Premium Scroll Indicator — outer div: scroll-fade, inner: entry fade */}
            <motion.div
                className="scroll-indicator"
                style={{ opacity: opacityFade }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <div style={{ position: 'relative', width: '1px', height: '80px' }}>
                        {/* Track */}
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.1)' }} />
                        {/* Beam fill */}
                        <motion.div
                            animate={{ scaleY: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: [0.4, 0, 0.6, 1], repeatDelay: 0.3 }}
                            style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '100%', background: 'var(--text-main)', transformOrigin: 'top' }}
                        />
                        {/* Dot */}
                        <motion.div
                            animate={{ y: [0, 72, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: [0.4, 0, 0.6, 1], repeatDelay: 0.3 }}
                            style={{ position: 'absolute', left: '-3px', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--text-main)', boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}
                        />
                    </div>
                    <motion.span
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        style={{ fontSize: '0.55rem', fontFamily: 'var(--font-body)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: '10px' }}
                    >
                        Scroll
                    </motion.span>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';
import Abstract3D from './Abstract3D';

// Sharp expo easing — same feel as Linear, Vercel, Framer
const EXPO = [0.16, 1, 0.3, 1];

const Hero = () => {
    const ref = useRef(null);
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
                            A venture company building across AI, Quantum Computing, Robotics, and Physics,  each venture a deliberate bet on the hardest unsolved problems.
                            <br /><br />
                            <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>Beyond incremental progress.</span>
                        </p>
                    </div>

                    {/* Right — CTA */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', justifySelf: 'start', width: '100%' }}>
                        <button
                            className="btn-premium hover-target"
                            onClick={() => {
                                const el = document.getElementById('newsletter');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{ padding: 'clamp(14px, 2vh, 20px) clamp(24px, 4vw, 40px)', fontSize: 'clamp(0.8rem, 1vw, 1rem)', letterSpacing: '0.1em', textTransform: 'uppercase', width: 'min(100%, 320px)' }}
                        >
                            Request Priority Access
                        </button>
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

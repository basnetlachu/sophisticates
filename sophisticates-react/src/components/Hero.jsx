import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

    // Parallax dynamics for extreme depth
    const yText1 = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const yText2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const yText3 = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scaleDown = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 60, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 50, damping: 20, mass: 1.5 }
        }
    };

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
            paddingBottom: 'clamp(40px, 8vh, 80px)'
        }}>
            {/* Structural Tech Background */}
            <div className="bg-grid" />

            {/* Ambient Background Experience */}
            <div className="mesh-gradient-bg" />
            <div className="mesh-blob" style={{ top: '-10%', right: '5%', width: '50vw', height: '50vw', opacity: 0.8 }} />
            <div className="mesh-blob" style={{ bottom: '10%', left: '-15%', animationDelay: '-7s', width: '60vw', height: '60vw', opacity: 0.6 }} />

            <motion.div
                style={{
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: opacityFade,
                    scale: scaleDown,
                    width: '100%',
                    maxWidth: '1600px',
                    margin: '0 auto',
                    padding: '0 clamp(20px, 5vw, 60px)'
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Advanced Micro-Header */}
                <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(40px, 8vh, 80px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '40px', height: '1px', background: 'var(--text-main)' }} />
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--text-main)', fontWeight: 500 }}>
                            Sophisticates
                        </span>
                    </div>
                </motion.div>

                {/* Main Typography Layout */}
                <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <motion.div variants={itemVariants} style={{ y: yText1 }}>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 7vw, 6rem)',
                            lineHeight: 0.95,
                            letterSpacing: '-0.04em',
                            textAlign: 'left',
                            color: 'var(--text-main)',
                            fontWeight: 400,
                            margin: 0,
                            fontFamily: 'var(--font-display)'
                        }}>
                            Clarity in <span style={{ color: 'var(--text-dim)' }}>Complexity.</span>
                        </h1>
                    </motion.div>

                    <motion.div variants={itemVariants} style={{ y: yText2 }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            textAlign: 'left',
                            color: 'var(--text-muted)',
                            fontWeight: 300,
                            margin: 0,
                            fontFamily: 'var(--font-display)',
                            marginTop: '10px'
                        }}>
                           Redefining Reality.
                        </h2>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} style={{ marginTop: 'clamp(40px, 12vh, 120px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 4vw, 40px)', alignItems: 'flex-end' }}>

                    {/* Left detailed text */}
                    <div style={{ maxWidth: '400px' }}>
                        <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)', color: 'var(--text-muted)', lineHeight: '1.7', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                            We build the foundational infrastructure for intelligence and physical systems with scientific rigor.
                            <br /><br />
                            <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>Beyond incremental progress.</span>
                        </p>
                    </div>

                    {/* Right action block */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', justifySelf: 'start', width: '100%' }}>
                        <button
                            className="btn-premium hover-target"
                            onClick={() => {
                                const el = document.getElementById('newsletter');
                                if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
                            }}
                            style={{ padding: 'clamp(14px, 2vh, 20px) clamp(24px, 4vw, 40px)', fontSize: 'clamp(0.8rem, 1vw, 1rem)', letterSpacing: '0.1em', textTransform: 'uppercase', width: 'min(100%, 320px)' }}
                        >
                            Request Priority Access
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scrolling indicator */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                    opacity: 0.3,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 2, duration: 1.5 }}
            >
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    style={{ width: '1px', height: '60px', background: 'var(--text-main)' }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 100, opacity: 0, rotateX: -20 },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--bg-color)',
            paddingTop: 'clamp(100px, 15vh, 120px)',
            paddingBottom: 'clamp(40px, 8vh, 60px)',
            paddingLeft: 'var(--container-padding)',
            paddingRight: 'var(--container-padding)'
        }}>

            {/* Abstract Background Grid */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
                backgroundSize: '120px 120px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
            }} />

            <motion.div
                style={{ zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    letterSpacing: '-0.04em',
                    lineHeight: '0.85',
                    fontFamily: 'Syne, sans-serif'
                }}>
                    <motion.span variants={itemVariants} style={{ fontSize: 'clamp(3rem, 12vw, 9rem)', color: 'var(--text-main)' }}>CLARITY</motion.span>
                    <motion.span variants={itemVariants} style={{ fontSize: 'clamp(3rem, 12vw, 9rem)', color: 'var(--text-muted)' }}>IN</motion.span>
                    <motion.span variants={itemVariants} style={{ fontSize: 'clamp(3rem, 12vw, 9rem)', color: 'var(--text-main)' }}>COMPLEXITY</motion.span>
                </h1>

                <motion.div variants={itemVariants} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4em',
                        fontSize: '0.7rem',
                        opacity: 0.6,
                        color: 'var(--text-main)'
                    }}>
                        Redefining Reality
                    </span>
                    <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--text-main), transparent)', marginTop: '20px' }}></div>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: 'var(--text-main)', color: 'var(--bg-color)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            marginTop: 'clamp(30px, 5vh, 40px)',
                            padding: 'clamp(12px, 2vh, 15px) clamp(30px, 5vw, 40px)',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--text-main)',
                            color: 'var(--text-main)',
                            borderRadius: '2px',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                            fontFamily: 'Space Grotesk, sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            cursor: 'none'
                        }}
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Request Early Access
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Side Meta Text (Desktop Only) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{ position: 'absolute', bottom: '50px', left: 'var(--container-padding)', maxWidth: '300px' }}
                className="desktop-only"
            >
                <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-muted)' }}>
                    We decode the complexity of tomorrow to propel humanity beyond boundaries by engineering intelligence for the hardest frontiers.
                </p>
            </motion.div>

            {/* Coordinate markers or subtle tech details */}
            <div style={{ position: 'absolute', top: 'var(--container-padding)', right: 'var(--container-padding)', opacity: 0.2, fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-main)', textAlign: 'right' }} className="desktop-only">
                LAT: 40.7128° N<br />
                LONG: 74.0060° W<br />
                // FRONTIER_CORE_V1.0
            </div>
        </section>
    );
};

export default Hero;

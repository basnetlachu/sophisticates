import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EXPO = [0.16, 1, 0.3, 1];

const NotFound = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let w, h;

        const resize = () => {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 30 }, () => ({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.0003,
            vy: (Math.random() - 0.5) * 0.0003,
            size: Math.random() * 1.5 + 0.5,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = 1;
                if (p.x > 1) p.x = 0;
                if (p.y < 0) p.y = 1;
                if (p.y > 1) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <section style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden',
            padding: '0 clamp(20px, 5vw, 60px)',
        }}>
            {/* Subtle background canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    opacity: 0.4,
                }}
            />

            {/* Grid overlay */}
            <div className="bg-grid" />

            <div style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '900px',
                width: '100%',
                textAlign: 'left',
            }}>

                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EXPO }}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 'clamp(48px, 8vh, 96px)' }}
                >
                    <div style={{ width: '40px', height: '1px', background: 'var(--text-main)' }} />
                    <span style={{
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-body)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3em',
                        color: 'var(--text-main)',
                        fontWeight: 500,
                    }}>
                        Sophisticates
                    </span>
                    <span style={{
                        fontSize: '0.6rem',
                        fontFamily: 'var(--font-body)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'var(--text-dim)',
                        fontWeight: 400,
                    }}>
                        · Error 404
                    </span>
                </motion.div>

                {/* 404 */}
                <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
                    <motion.div
                        initial={{ y: '105%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 1.2, ease: EXPO, delay: 0.05 }}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(7rem, 22vw, 18rem)',
                            fontWeight: 400,
                            letterSpacing: '-0.05em',
                            lineHeight: 0.85,
                            color: 'var(--text-main)',
                            userSelect: 'none',
                        }}
                    >
                        404
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.75, ease: EXPO, delay: 0.3 }}
                    style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, var(--text-main), transparent)',
                        transformOrigin: 'left',
                        marginBottom: 'clamp(32px, 5vh, 56px)',
                        maxWidth: '560px',
                    }}
                />

                {/* Message + CTA row */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EXPO, delay: 0.38 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                        gap: 'clamp(32px, 5vw, 56px)',
                        alignItems: 'flex-end',
                    }}
                >
                    <div>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                            color: 'var(--text-muted)',
                            lineHeight: '1.7',
                            fontWeight: 300,
                            margin: 0,
                        }}>
                            This page doesn't exist — or it did, and we moved it.<br />
                            Either way, there's nothing here.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <motion.button
                            onClick={() => navigate('/')}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
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
                                borderBottom: '1px solid var(--border-color)',
                                paddingBottom: '12px',
                            }}
                        >
                            Return to Sophisticates
                            <span style={{ fontSize: '1rem' }}>↗</span>
                        </motion.button>

                        <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.6rem',
                            color: 'var(--text-dim)',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            sophisticatesai.com
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NotFound;

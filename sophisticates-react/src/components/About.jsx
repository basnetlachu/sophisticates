import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';
import Vision from './Vision';
import Purpose from './Purpose';
import Values from './Values';
import Personality from './Personality';

const About = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    useEffect(() => {
        // Reveal on scroll observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <main className="smooth-scroll-wrapper">
            <Helmet>
                <title>About Sophisticates — Deep Tech Venture Company | Clarity In Complexity</title>
                <meta name="description" content="Learn about Sophisticates — a deep tech venture company founded by Lachu Man Basnet. We bridge the gap between theoretical possibility and practical reality across AI, Quantum Computing, Robotics, and Physics." />
                <link rel="canonical" href="https://sophisticatesai.com/about" />
            </Helmet>
        <section id="about" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            position: 'relative',
            paddingTop: 'clamp(60px, 10vh, 120px)',
            paddingBottom: 'clamp(60px, 10vh, 120px)',
            minHeight: '100vh',
            overflow: 'hidden'
        }}>
            <div className="max-w-container">
                <motion.div
                    initial={isMobile ? {} : { opacity: 0, y: 50 }}
                    animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ maxWidth: '1400px', margin: '0 auto' }}
                >
                    <div className="section-label-wrapper">
                        <div className="section-label-line" />
                        <span className="section-label">About Us</span>
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.7rem, 3.2vw, 2.8rem)',
                        lineHeight: '1.2',
                        fontWeight: 400,
                        color: 'var(--text-main)',
                        marginBottom: 'clamp(40px, 8vh, 80px)',
                        textAlign: (!isMobile) ? 'left' : 'center',
                        letterSpacing: '-0.06em',
                        maxWidth: '1200px',
                        margin: '0 auto 120px 0'
                    }}>
                        Clarity in Complexity, <span className="text-accent" style={{ color: 'var(--text-dim)' }}>Redefining Reality</span>.
                    </h2>

                    <div className="about-grid">
                        <div>
                            <p style={{
                                fontSize: 'clamp(0.95rem, 1.3vw, 1.3rem)',
                                color: 'var(--text-muted)',
                                lineHeight: '1.7',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 300,
                                margin: 0
                            }}>
                                At Sophisticates, we believe every complex problem in AI, Quantum Computing, Robotics and Physics can be broken into clear, understandable pieces.
                            </p>
                        </div>

                        <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: 'clamp(32px, 5vw, 80px)' }} className="about-col-right">
                            <p style={{
                                fontSize: 'clamp(0.95rem, 1.3vw, 1.3rem)',
                                color: 'var(--text-muted)',
                                lineHeight: '1.7',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 300,
                                margin: 0
                            }}>
                                By doing so, we create solutions that not only solve technical challenges but also <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>redefine the way we experience reality</span>.
                                <br /><br />
                                <span style={{ color: 'var(--text-main)', fontWeight: 500, display: 'block', marginTop: '40px', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    Shaping the future, structurally.
                                </span>
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'clamp(60px, 12vh, 120px)' }}>
                        <div className="section-label-wrapper">
                            <div className="section-label-line" />
                            <span className="section-label">Manifesto</span>
                        </div>

                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.7rem, 3.2vw, 2.8rem)',
                            lineHeight: '1.2',
                            fontWeight: 400,
                            color: 'var(--text-main)',
                            marginBottom: 'clamp(40px, 8vh, 80px)',
                            textAlign: (!isMobile) ? 'left' : 'center',
                            letterSpacing: '-0.06em',
                            maxWidth: '1200px',
                            margin: '0 auto 120px 0'
                        }}>
                            Bridging the widening gap between <span className="text-accent" style={{ color: 'var(--text-dim)' }}>theoretical possibility</span> and <span style={{ opacity: 0.8 }}>practical reality</span>.
                        </h2>

                        <div className="about-grid">
                            <div>
                                <p style={{
                                    fontSize: 'clamp(0.95rem, 1.3vw, 1.3rem)',
                                    color: 'var(--text-muted)',
                                    lineHeight: '1.7',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 300,
                                    margin: 0
                                }}>
                                    Across disciplines like artificial intelligence, quantum computing, physics, and robotics, foundational limits are often well understood, yet rarely translated into systems that can be hardened, trusted, and scaled in the real world.
                                </p>
                            </div>

                            <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: 'clamp(32px, 5vw, 80px)' }} className="about-col-right">
                                <p style={{
                                    fontSize: 'clamp(0.95rem, 1.3vw, 1.3rem)',
                                    color: 'var(--text-muted)',
                                    lineHeight: '1.7',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 300,
                                    margin: 0
                                }}>
                                    We work at the intersection of deep theory and engineering discipline. Sophisticates transforms abstract constraints into <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>tangible capabilities</span> that make complex systems intelligible, usable, and durable.
                                    <br /><br />
                                    <span style={{ color: 'var(--text-main)', fontWeight: 500, display: 'block', marginTop: '40px', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        It is the vehicle through which breakthroughs become real.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Graphic */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, var(--grid-line) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
            }} />
        </section>
        <Vision />
        <Purpose />
        <Values />
        <Personality />
        </main>
    );
};

export default About;

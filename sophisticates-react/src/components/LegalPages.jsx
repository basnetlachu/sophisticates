import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const LegalLayout = ({ title, children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{
            background: 'var(--bg-color)',
            minHeight: '100vh',
            padding: 'clamp(120px, 15vw, 180px) clamp(20px, 5vw, 40px)',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-body)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background */}
            <div className="mesh-gradient-bg">
                <div className="mesh-blob" style={{ top: '-10%', left: '20%', width: '40vw', height: '40vw', animationDelay: '0s' }}></div>
            </div>

            <div className="max-w-container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.3rem, 6vw, 3.6rem)',
                        marginBottom: 'clamp(60px, 10vw, 100px)',
                        letterSpacing: '-0.02em',
                        color: 'var(--text-main)',
                        textAlign: 'center',
                        lineHeight: 1.1,
                        textTransform: 'uppercase'
                    }}>
                    {title}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(60px, 10vw, 100px)', maxWidth: '800px', width: '100%' }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export const Privacy = () => (
    <>
    <Helmet>
        <title>Privacy Policy — Sophisticates</title>
        <meta name="description" content="Sophisticates privacy policy. We collect the minimum necessary data with scientific rigor. Read how we handle your information." />
        <link rel="canonical" href="https://sophisticatesai.com/privacy" />
    </Helmet>
    <LegalLayout title="Privacy Policy">
        <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '32px', color: 'var(--text-muted)' }}>// 01. Data Protocols</h2>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.2rem', opacity: 0.8 }}>
                Sophisticates operates with scientific rigor in data handling. We collect the minimum necessary information required for operational integrity. This includes data provided via secure contact forms and telemetry metrics used exclusively for site performance optimization.
            </p>
        </section>

        <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '32px', color: 'var(--text-muted)' }}>// 02. Usage & Transmission</h2>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.2rem', opacity: 0.8 }}>
                Information processed by our systems is utilized solely to facilitate research partnerships, respond to technical inquiries, and refine our infrastructure. We maintain a zero-tolerance policy towards the sale or unauthorized sharing of user data with third-party advertising entities.
            </p>
        </section>

        <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '32px', color: 'var(--text-muted)' }}>// 03. Sovereignty</h2>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.2rem', opacity: 0.8 }}>
                Sophisticates respects your digital sovereignty. You may request a full disclosure or deletion of any data associated with your interaction by contacting our privacy desk at <strong style={{ color: 'var(--text-main)' }}>general@sophisticatesai.com</strong>.
            </p>
        </section>

        <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '60px', marginTop: '40px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Last Updated: February 2026<br />
                Sophisticates Operational Command
            </p>
        </section>
    </LegalLayout>
    </>
);

export const Terms = () => (
    <>
    <Helmet>
        <title>Terms of Service — Sophisticates</title>
        <meta name="description" content="Sophisticates terms of service. Read the terms governing your use of sophisticatesai.com and our deep tech platform." />
        <link rel="canonical" href="https://sophisticatesai.com/terms" />
    </Helmet>
    <LegalLayout title="Terms of Service">
        <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '32px', color: 'var(--text-muted)' }}>// 01. Engagement</h2>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.2rem', opacity: 0.8 }}>
                By accessing the Sophisticates digital environment, you acknowledge and agree to comply with international legal frameworks governing intellectual property and digital interaction. This environment is designed for professional engagement and research-level inquiry.
            </p>
        </section>

        <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '32px', color: 'var(--text-muted)' }}>// 02. Intellectual Property</h2>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.2rem', opacity: 0.8 }}>
                All technical content, symbolic imagery, architectural diagrams, and proprietary algorithms (including MEMOPT documentation) displayed within this site are the exclusive property of Sophisticates. Unauthorized replication, reverse engineering, or redistribution is strictly prohibited.
            </p>
        </section>

        <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '32px', color: 'var(--text-muted)' }}>// 03. Liability Constraints</h2>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.2rem', opacity: 0.8 }}>
                Sophisticates provides information on an "as-is" basis for visionary and research purposes. While we strive for absolute precision, we are not liable for any outcomes arising from the use of information or simulated telemetry provided herein.
            </p>
        </section>

        <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '60px', marginTop: '40px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Last Updated: February 2026<br />
                Sophisticates Operational Command
            </p>
        </section>
    </LegalLayout>
    </>
);

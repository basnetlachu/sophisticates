import React, { useEffect } from 'react';

const LegalLayout = ({ title, children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{
            background: 'var(--bg-color)',
            minHeight: '100vh',
            padding: 'clamp(100px, 15vw, 160px) clamp(20px, 5vw, 40px)',
            color: 'var(--text-main)',
            fontFamily: 'Space Grotesk, sans-serif'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    marginBottom: 'clamp(40px, 10vw, 80px)',
                    letterSpacing: '-0.02em',
                    color: 'var(--text-main)'
                }}>
                    {title}
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 8vw, 60px)' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export const Privacy = () => (
    <LegalLayout title="Privacy Policy">
        <section>
            <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px', color: 'var(--text-muted)' }}>// 01. Data Protocols</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Sophisticates operates with scientific rigor in data handling. We collect the minimum necessary information required for operational integrity. This includes data provided via secure contact forms and telemetry metrics used exclusively for site performance optimization.
            </p>
        </section>

        <section>
            <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px', color: 'var(--text-muted)' }}>// 02. Usage & Transmission</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Information processed by our systems is utilized solely to facilitate research partnerships, respond to technical inquiries, and refine our infrastructure. We maintain a zero-tolerance policy towards the sale or unauthorized sharing of user data with third-party advertising entities.
            </p>
        </section>

        <section>
            <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px', color: 'var(--text-muted)' }}>// 03. Sovereignty</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Sophisticates respects your digital sovereignty. You may request a full disclosure or deletion of any data associated with your interaction by contacting our privacy desk at <strong>general@sophisticatesai.com</strong>.
            </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', marginTop: '40px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.5 }}>
                Last Updated: February 2026<br />
                Sophisticates Operational Command
            </p>
        </section>
    </LegalLayout>
);

export const Terms = () => (
    <LegalLayout title="Terms of Service">
        <section>
            <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px', color: 'var(--text-muted)' }}>// 01. Engagement</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                By accessing the Sophisticates digital environment, you acknowledge and agree to comply with international legal frameworks governing intellectual property and digital interaction. This environment is designed for professional engagement and research-level inquiry.
            </p>
        </section>

        <section>
            <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px', color: 'var(--text-muted)' }}>// 02. Intellectual Property</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                All technical content, symbolic imagery, architectural diagrams, and proprietary algorithms (including MEMOPT documentation) displayed within this site are the exclusive property of Sophisticates. Unauthorized replication, reverse engineering, or redistribution is strictly prohibited.
            </p>
        </section>

        <section>
            <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px', color: 'var(--text-muted)' }}>// 03. Liability Constraints</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Sophisticates provides information on an "as-is" basis for visionary and research purposes. While we strive for absolute precision, we are not liable for any outcomes arising from the use of information or simulated telemetry provided herein.
            </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px', marginTop: '40px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.5 }}>
                Last Updated: February 2026<br />
                Sophisticates Operational Command
            </p>
        </section>
    </LegalLayout>
);

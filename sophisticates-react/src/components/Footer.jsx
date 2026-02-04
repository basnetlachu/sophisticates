import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleNavClick = (e, id) => {
        e.preventDefault();
        if (pathname === '/') {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <footer style={{
            padding: '80px 0',
            background: 'var(--bg-color)',
            borderTop: '1px solid var(--border-color)'
        }}>
            <div
                className="max-w-container footer-stack-mobile"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '48px', marginBottom: '80px' }}
            >

                {/* Left: Brand info */}
                <div style={{ maxWidth: '400px', width: '100%' }}>
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                        <img
                            src="/sophisticates.png"
                            alt="Sophisticates"
                            className="flexible-logo"
                            style={{ height: 'clamp(60px, 8vw, 84px)', opacity: 1, marginBottom: '30px' }}
                        />
                    </Link>
                    <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '40px' }}>
                        Building the foundational infrastructure for intelligence and physical systems with scientific rigor.
                    </p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <a href="https://www.linkedin.com/company/sophisticates" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', color: 'var(--text-main)', opacity: 0.4, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>LinkedIn</a>
                    </div>
                </div>

                {/* Middle: Links */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '60px', width: '100%', maxWidth: '600px' }}>
                    <div>
                        <h4 style={{ fontFamily: 'Syne', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: 'var(--text-main)' }}>Navigation</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { name: 'Home', id: 'hero' },
                                { name: 'About', id: 'about' },
                                { name: 'Technology', id: 'vision' },
                                { name: 'Products', id: 'products' },
                                { name: 'Use Cases', id: 'use-cases' },
                                { name: 'Partners', id: 'who-we-serve' },
                                { name: 'Contact', id: 'contact' }
                            ].map(item => (
                                <a
                                    key={item.name}
                                    href={`#${item.id}`}
                                    style={{ fontSize: '0.9rem', color: 'var(--text-main)', opacity: 0.5, textDecoration: 'none' }}
                                    onClick={(e) => handleNavClick(e, item.id)}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div>
                        <h4 style={{ fontFamily: 'Syne', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: 'var(--text-main)' }}>Legal</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Link to="/privacy" style={{ fontSize: '0.9rem', color: 'var(--text-main)', opacity: 0.5, textDecoration: 'none' }}>Privacy Policy</Link>
                            <Link to="/terms" style={{ fontSize: '0.9rem', color: 'var(--text-main)', opacity: 0.5, textDecoration: 'none' }}>Terms of Service</Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px'
            }} className="footer-stack-mobile">
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.5 }}>
                    © {new Date().getFullYear()} Sophisticates. All rights reserved.
                </p>
                <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-muted)', opacity: 0.4, letterSpacing: '0.2em' }}>
                    v1.1.0_STABLE
                </div>
            </div>

            {/* Giant Background Text Effect */}
            <div style={{
                position: 'absolute',
                bottom: '-5%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '15vw',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                color: 'var(--text-main)',
                opacity: 0.02,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                zIndex: 0
            }}>
                SOPHISTICATES
            </div>
        </footer>
    );
};

export default Footer;

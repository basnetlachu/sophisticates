import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleNavClick = (e, id) => {
        e.preventDefault();

        if (typeof id === 'string' && id.startsWith('/')) {
            navigate(id);
            window.scrollTo(0, 0);
            return;
        }

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
            padding: 'clamp(100px, 15vh, 180px) 0 0 0',
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div
                className="max-w-container footer-stack-mobile"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '80px',
                    marginBottom: '100px',
                    position: 'relative',
                    zIndex: 2
                }}
            >

                {/* Left: Brand info */}
                <div style={{ maxWidth: '440px', width: '100%' }}>
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover-target">
                        <motion.img
                            src="/sophisticates.webp"
                            alt="Sophisticates"
                            className="flexible-logo"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            whileHover={{ scale: 1.1 }}
                            style={{
                                height: 'clamp(70px, 10vw, 100px)',
                                opacity: 1,
                                marginBottom: '40px',
                                objectFit: 'contain',
                                transformOrigin: 'center'
                            }}
                        />
                    </Link>
                    <p style={{
                        fontSize: 'clamp(1.2rem, 1.5vw, 1.4rem)',
                        lineHeight: '1.5',
                        color: 'var(--text-muted)',
                        marginBottom: '48px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 300
                    }}>
                        Building the foundational infrastructure for intelligence and physical systems with extreme scientific rigor.
                    </p>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <a href="https://www.linkedin.com/company/sophisticates" target="_blank" rel="noopener noreferrer" className="hover-target" style={{ fontSize: '0.7rem', color: 'var(--text-main)', opacity: 0.4, textDecoration: 'none', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', transition: 'all 0.4s' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.4}>LinkedIn</a>
                    </div>
                </div>

                {/* Middle: Links */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '80px', width: '100%', maxWidth: '600px' }}>
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '32px', color: 'var(--text-main)', opacity: 0.5 }}>Navigation</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            {[
                                { name: 'Home', id: 'hero' },
                                { name: 'About', id: '/about' },
                                { name: 'Research', id: '/research' },

                                { name: 'Partners', id: '/partners' },
                                { name: 'Contact', id: '/contact' }
                            ].map(item => (
                                <a
                                    key={item.name}
                                    href={`#${item.id}`}
                                    className="hover-target"
                                    style={{ fontSize: '1rem', color: 'var(--text-main)', opacity: 0.5, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'all 0.4s', fontWeight: 300 }}
                                    onClick={(e) => handleNavClick(e, item.id)}
                                    onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = 'translateX(8px)' }}
                                    onMouseLeave={e => { e.target.style.opacity = 0.5; e.target.style.transform = 'translateX(0)' }}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '32px', color: 'var(--text-main)', opacity: 0.5 }}>Legal</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            <Link className="hover-target" to="/privacy" style={{ fontSize: '1rem', color: 'var(--text-main)', opacity: 0.5, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'all 0.4s', fontWeight: 300 }} onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = 'translateX(8px)' }} onMouseLeave={e => { e.target.style.opacity = 0.5; e.target.style.transform = 'translateX(0)' }}>Privacy Policy</Link>
                            <Link className="hover-target" to="/terms" style={{ fontSize: '1rem', color: 'var(--text-main)', opacity: 0.5, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'all 0.4s', fontWeight: 300 }} onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = 'translateX(8px)' }} onMouseLeave={e => { e.target.style.opacity = 0.5; e.target.style.transform = 'translateX(0)' }}>Terms of Service</Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                marginTop: '120px',
                paddingBottom: '40px'
            }}>
                <div
                    className="max-w-container footer-stack-mobile"
                    style={{
                        paddingTop: '40px',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '24px'
                    }}
                >
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-body)' }}>
                        © {new Date().getFullYear()} Sophisticates. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Giant Background Text Effect */}
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translate(-50%, 20%)',
                fontSize: '22vw',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                color: 'var(--text-main)',
                opacity: 0.02,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                zIndex: 1,
                lineHeight: 0.8,
                letterSpacing: '-0.05em'
            }}>
                SOPHISTICATES
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Home', id: 'hero' },
        { name: 'Ventures', id: 'portfolio' },
        { name: 'About', id: '/about' },
        { name: 'Research', id: '/research' },
        { name: 'Partners', id: '/partners' },
        { name: 'Contact', id: '/contact' }
    ];

    const handleLogoClick = () => {
        setIsMenuOpen(false);
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNavClick = (id) => {
        setIsMenuOpen(false);

        if (typeof id === 'string' && id.startsWith('/')) {
            navigate(id);
            window.scrollTo(0, 0);
            return;
        }

        if (pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                const navHeight = window.innerWidth <= 767 ? 64 : 80;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        } else {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const navHeight = window.innerWidth <= 767 ? 64 : 80;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: elementPosition - navHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };

    const handleRequestAccess = () => {
        setIsMenuOpen(false);
        handleNavClick('closing');
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1100) {
                setIsMenuOpen(false);
                document.body.style.overflow = '';
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 2000,
                    background: 'var(--nav-bg)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    borderBottom: '1px solid var(--border-color)',
                    height: 'clamp(64px, 10vh, 90px)',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div className="max-w-container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Link
                        to="/"
                        className="hover-target"
                        onClick={handleLogoClick}
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                            height: '100%',
                            paddingRight: '10px',
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <img
                            src="/sophisticates.webp"
                            alt="Sophisticates"
                            className="flexible-logo"
                            style={{
                                height: 'clamp(28px, 6vw, 42px)',
                                width: 'auto',
                                maxWidth: '160px',
                                objectFit: 'contain',
                                display: 'block',
                                transition: 'opacity 0.3s ease',
                            }}
                        />
                    </Link>

                    {/* Right Side Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 32px)', flexShrink: 0 }}>

                        {/* Desktop Navigation Links */}
                        <nav className="desktop-only" style={{ display: 'flex', gap: 'clamp(16px, 2.2vw, 32px)', alignItems: 'center', flexShrink: 1 }}>
                            {menuItems.map((item) => (
                                <NavLink key={item.name} item={item.name} id={item.id} onClick={() => handleNavClick(item.id)} />
                            ))}
                        </nav>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {/* Theme Toggle */}
                            <motion.button
                                onClick={toggleTheme}
                                whileTap={{ scale: 0.9 }}
                                className="hover-target"
                                style={{
                                    padding: 0,
                                    cursor: 'pointer',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '50%',
                                    width: '38px',
                                    height: '38px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-main)',
                                    fontSize: '0.9rem',
                                    background: 'transparent',
                                    flexShrink: 0,
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--grid-line)'; e.currentTarget.style.borderColor = 'var(--text-dim)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                            >
                                {isDarkMode ? '☼' : '☾'}
                            </motion.button>

                            {/* Desktop Request Access Button */}
                            <motion.button
                                className="desktop-only hover-target btn-premium"
                                style={{
                                    padding: '12px 28px',
                                    fontSize: '0.75rem',
                                    flexShrink: 0,
                                    borderRadius: '2px'
                                }}
                                onClick={handleRequestAccess}
                            >
                                Request Access
                            </motion.button>
                        </div>

                        {/* Mobile Menu Trigger */}
                        <div
                            className="mobile-only hover-target"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                flexShrink: 0
                            }}
                        >
                            <div style={{
                                width: '24px',
                                height: '14px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative'
                            }}>
                                <motion.span
                                    animate={isMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ width: '100%', height: '1.5px', background: 'var(--text-main)', display: 'block', transformOrigin: 'center' }}
                                />
                                <motion.span
                                    animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ width: '100%', height: '1.5px', background: 'var(--text-main)', display: 'block' }}
                                />
                                <motion.span
                                    animate={isMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ width: '100%', height: '1.5px', background: 'var(--text-main)', display: 'block', transformOrigin: 'center' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'var(--bg-color)',
                            zIndex: 1500,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '80px 40px 40px',
                            gap: '60px'
                        }}
                    >
                        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
                            {menuItems.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href={typeof item.id === 'string' && item.id.startsWith('/') ? item.id : `#${item.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                                    className="hover-target"
                                    style={{
                                        fontSize: 'clamp(1.7rem, 6.4vw, 2.4rem)',
                                        fontFamily: 'var(--font-display)',
                                        color: 'var(--text-main)',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontWeight: 400
                                    }}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            style={{ width: '100%', maxWidth: '300px' }}
                        >
                            <motion.button
                                className="btn-premium hover-target"
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    fontSize: '0.85rem'
                                }}
                                onClick={handleRequestAccess}
                            >
                                Request Access
                            </motion.button>
                        </motion.div>

                        {/* Decoration */}
                        <div style={{
                            position: 'absolute',
                            bottom: '40px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.65rem',
                            opacity: 0.2,
                            color: 'var(--text-main)',
                            letterSpacing: '0.6em'
                        }}>
                            SOPHISTICATES
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const NavLink = ({ item, id, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <a
            href={typeof id === 'string' && id.startsWith('/') ? id : `#${id}`}
            className="hover-target"
            style={{ textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '10px 0' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => { e.preventDefault(); onClick(); }}
        >
            <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                color: 'var(--text-main)',
                letterSpacing: '0.2em',
                opacity: isHovered ? 1 : 0.4,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'translateY(0)' : 'translateY(0)'
            }}>{item}</span>

            <span style={{
                position: 'absolute',
                bottom: 6,
                left: 0,
                width: isHovered ? '100%' : '0%',
                height: '1px',
                backgroundColor: 'var(--text-muted)',
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
        </a>
    );
};

export default Navbar;

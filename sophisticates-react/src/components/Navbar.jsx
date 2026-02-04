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
        { name: 'About', id: 'about' },
        { name: 'Technology', id: 'vision' },
        { name: 'Products', id: 'products' },
        { name: 'Use Cases', id: 'use-cases' },
        { name: 'Partners', id: 'who-we-serve' },
        { name: 'Contact', id: 'contact' }
    ];

    const handleLogoClick = () => {
        setIsMenuOpen(false);
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
            window.scrollTo(0, 0);
        }
    };

    const handleNavClick = (id) => {
        setIsMenuOpen(false);
        if (pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                const navHeight = 80;
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
                    const navHeight = 80;
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
        handleNavClick('contact');
    };

    // Close menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1100) {
                setIsMenuOpen(false);
                document.body.style.overflow = 'unset';
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 2000,
                    background: 'var(--nav-bg)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid var(--border-color)',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div className="max-w-container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        <img
                            src="/sophisticates.png"
                            alt="Sophisticates"
                            className="flexible-logo"
                            style={{ height: 'clamp(40px, 5vw, 56px)' }}
                        />
                    </div>

                    {/* Right Side Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1.5vw, 16px)', flexShrink: 1 }}>

                        {/* Theme Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', flexShrink: 0 }}>
                            <motion.button
                                onClick={toggleTheme}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    padding: 0,
                                    cursor: 'pointer',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-main)',
                                    fontSize: '0.9rem',
                                    background: 'transparent'
                                }}
                            >
                                {isDarkMode ? '☼' : '☾'}
                            </motion.button>
                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="desktop-only" style={{ display: 'flex', gap: 'clamp(10px, 1.8vw, 24px)', alignItems: 'center', flexShrink: 1 }}>
                            {menuItems.map((item) => (
                                <NavLink key={item.name} item={item.name} id={item.id} onClick={() => handleNavClick(item.id)} />
                            ))}
                        </nav>

                        {/* Desktop Request Access Button */}
                        <motion.button
                            className="desktop-only"
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--text-main)', color: 'var(--bg-color)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'transparent',
                                border: '1px solid var(--text-main)',
                                color: 'var(--text-main)',
                                borderRadius: '2px',
                                fontSize: '0.7rem',
                                fontFamily: 'Space Grotesk, sans-serif',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                cursor: 'pointer',
                                flexShrink: 0
                            }}
                            onClick={handleRequestAccess}
                        >
                            Request Access
                        </motion.button>

                        {/* Mobile Menu Trigger */}
                        <div
                            className="mobile-only"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                paddingTop: '3px'
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
                        transition={{ duration: 0.3 }}
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
                            gap: '40px'
                        }}
                    >
                        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
                            {menuItems.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href={`#${item.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1 }}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                                    style={{
                                        fontSize: '1.8rem',
                                        fontFamily: 'Syne, sans-serif',
                                        color: 'var(--text-main)',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontWeight: 600
                                    }}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{ width: '100%', maxWidth: '300px', marginTop: '20px' }}
                        >
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    backgroundColor: 'var(--text-main)',
                                    color: 'var(--bg-color)',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    fontWeight: 700
                                }}
                                onClick={handleRequestAccess}
                            >
                                Request Early Access
                            </motion.button>
                        </motion.div>

                        {/* Decoration */}
                        <div style={{
                            position: 'absolute',
                            bottom: '40px',
                            fontFamily: 'monospace',
                            fontSize: '0.6rem',
                            opacity: 0.3,
                            color: 'var(--text-main)',
                            letterSpacing: '0.5em'
                        }}>
                            SOPHISTICATES_V1.1
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
            href={`#${id}`}
            style={{ textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => { e.preventDefault(); onClick(); }}
        >
            <span style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                color: 'var(--text-main)',
                letterSpacing: '0.05em',
                opacity: isHovered ? 1 : 0.7,
                transition: 'opacity 0.3s'
            }}>{item}</span>

            <span style={{
                position: 'absolute',
                bottom: -4,
                left: 0,
                width: isHovered ? '100%' : '0%',
                height: '1px',
                backgroundColor: 'var(--text-main)',
                transition: 'width 0.3s ease'
            }} />
        </a>
    );
};

export default Navbar;

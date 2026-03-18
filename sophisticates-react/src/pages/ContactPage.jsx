import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="smooth-scroll-wrapper">
            <div style={{ paddingTop: 'clamp(60px, 10vh, 100px)' }}>
                <Contact />
            </div>
            
            {/* Optional filler to ensure footer doesn't feel cramped on a short page */}
            <div style={{ minHeight: '20vh', background: 'var(--bg-color)' }} />
        </main>
    );
};

export default ContactPage;

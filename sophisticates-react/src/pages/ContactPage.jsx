import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="smooth-scroll-wrapper">
            <Helmet>
                <title>Contact Sophisticates — Deep Tech Venture Company</title>
                <meta name="description" content="Get in touch with Sophisticates. Contact us for partnerships, enterprise integrations, or general inquiries. Email hello@sophisticatesai.com or reach us via the contact form." />
                <link rel="canonical" href="https://sophisticatesai.com/contact" />
            </Helmet>
            <div style={{ paddingTop: 'clamp(60px, 10vh, 100px)' }}>
                <Contact />
            </div>
            
            {/* Optional filler to ensure footer doesn't feel cramped on a short page */}
            <div style={{ minHeight: '20vh', background: 'var(--bg-color)' }} />
        </main>
    );
};

export default ContactPage;

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';
import { Turnstile } from '@marsidev/react-turnstile';

const Contact = () => {
    const [formState, setFormState] = useState('idle');
    const [turnstileToken, setTurnstileToken] = useState(null);
    const turnstileRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        email: '',
        country: '',
        message: ''
    });

    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');
    const countryDropdownRef = useRef(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const isMobile = useMobile();
    const isDesktop = !isMobile;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setCountryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
        "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
        "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
        "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
        "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
        "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
        "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
        "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
        "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
        "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
        "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
        "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
        "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
        "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
        "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
        "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Other"
    ];

    const filteredCountries = countries.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase()));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.country) {
            alert('Please select a valid country from the dropdown.');
            return;
        }

        const domain = formData.email.split('@')[1];
        const personalDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'proton.me',
            'protonmail.com', 'zoho.com', 'yandex.com', 'mail.com', 'gmx.com', 'me.com', 'mac.com', 'live.com'
        ];
        if (domain && personalDomains.includes(domain.toLowerCase())) {
            alert('Please provide a valid business context email address. Personal webmail is not accepted.');
            return;
        }

        if (!turnstileToken) {
            alert('Please wait for the security check to complete.');
            return;
        }

        setFormState('submitting');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, turnstileToken }),
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setFormState('success');
                setFormData({ name: '', businessName: '', email: '', country: '', message: '' });
                setTurnstileToken(null);
                turnstileRef.current?.reset();
            } else {
                setFormState('error');
                alert(result.message || 'Transmission failed. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setFormState('error');
            alert('Failed to connect to the server. Please check your network.');
        }
    };

    return (
        <section id="contact" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            position: 'relative',
            paddingTop: 'clamp(60px, 8vh, 100px)',
            paddingBottom: 'clamp(60px, 8vh, 100px)'
        }}>
            <div className="max-w-container">
                <div className="contact-grid">

                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                            <div style={{ width: '40px', height: '1px', background: 'var(--text-main)' }} />
                            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 500 }}>
                                Contact Us
                            </span>
                        </div>

                        <h2 style={{
                            fontSize: 'clamp(2.3rem, 3.3vw, 3rem)',
                            color: 'var(--text-main)',
                            fontFamily: 'var(--font-display)',
                            lineHeight: '0.95',
                            marginBottom: '40px',
                            letterSpacing: '-0.05em',
                            fontWeight: 400
                        }}>
                            Get in <span className="text-accent" style={{ color: 'var(--text-dim)' }}>Touch.</span>
                        </h2>

                        <p style={{
                            fontSize: 'clamp(0.95rem, 1.3vw, 1.25rem)',
                            color: 'var(--text-muted)',
                            lineHeight: '1.7',
                            marginBottom: 'clamp(40px, 8vh, 80px)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 300,
                            maxWidth: 'min(480px, 100%)'
                        }}>
                            Our specialized teams are available for research partnerships and enterprise transitions. We operate on a principle of qualified mutual alignment.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                            <div>
                                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.3em', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '16px' }}>Book a Call</span>
                                <a href="mailto:partnerships@sophisticatesai.com" className="hover-target" style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.4rem)', color: 'var(--text-main)', margin: '0 0 32px 0', fontFamily: 'var(--font-body)', fontWeight: 300, letterSpacing: '-0.01em', textDecoration: 'none', display: 'block' }}>partnerships@sophisticatesai.com</a>

                                <motion.button
                                    className="btn-premium hover-target"
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.open('https://calendly.com/partnerships-sophisticatesai/30min', '_blank')}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px' }}
                                >
                                    <span style={{ opacity: 0.6 }}>[</span> Schedule Consultation <span style={{ opacity: 0.6 }}>]</span>
                                </motion.button>
                            </div>
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}>
                                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.3em', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '16px' }}>General Inquiry</span>
                                <a href="mailto:hello@sophisticatesai.com" className="hover-target" style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.4rem)', color: 'var(--text-main)', margin: '0', fontFamily: 'var(--font-body)', fontWeight: 300, letterSpacing: '-0.01em', textDecoration: 'none' }}>hello@sophisticatesai.com</a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="glass-panel"
                        style={{
                            padding: 'clamp(40px, 6vw, 80px)',
                            borderRadius: '2px',
                            border: '1px solid var(--border-color)'
                        }}
                    >
                        {formState === 'success' ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '500px' }}>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{ fontSize: '2rem', marginBottom: '32px', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    ✓
                                </motion.div>
                                <h3 style={{ color: 'var(--text-main)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '-0.04em', marginBottom: '20px' }}>Message Sent</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontFamily: 'var(--font-body)', fontWeight: 300, maxWidth: '320px', lineHeight: 1.6 }}>Our team will review your message and respond shortly.</p>
                                <button className="btn-outline hover-target" onClick={() => setFormState('idle')} style={{ marginTop: '48px', padding: '16px 32px' }}>Send Another Message</button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr', gap: 'clamp(24px, 4vw, 48px)' }}>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.2em', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '16px' }}>Full Name</label>
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="hover-target"
                                            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '12px 0', color: 'var(--text-main)', outline: 'none', fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 300, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                            onFocus={(e) => { e.target.style.borderColor = 'var(--text-main)'; e.target.style.borderBottomWidth = '1.5px'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.borderBottomWidth = '1px'; }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.2em', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '16px' }}>Organization</label>
                                        <input
                                            required
                                            name="businessName"
                                            type="text"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            className="hover-target"
                                            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '12px 0', color: 'var(--text-main)', outline: 'none', fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 300, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                            onFocus={(e) => { e.target.style.borderColor = 'var(--text-main)'; e.target.style.borderBottomWidth = '1.5px'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.borderBottomWidth = '1px'; }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr', gap: 'clamp(24px, 4vw, 48px)' }}>
                                    <div className="input-group">
                                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.2em', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '16px' }}>Business Email</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="secure@domain.ai"
                                            className="hover-target"
                                            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '12px 0', color: 'var(--text-main)', outline: 'none', fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 300, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                            onFocus={(e) => { e.target.style.borderColor = 'var(--text-main)'; e.target.style.borderBottomWidth = '1.5px'; }}
                                            onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.borderBottomWidth = '1px'; }}
                                        />
                                    </div>
                                    <div className="input-group" style={{ position: 'relative' }} ref={countryDropdownRef}>
                                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.2em', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '16px' }}>Operating Region</label>
                                        <input
                                            type="text"
                                            placeholder="Select Region..."
                                            value={countryDropdownOpen ? countrySearch : (formData.country || '')}
                                            onClick={() => setCountryDropdownOpen(true)}
                                            onChange={(e) => {
                                                setCountrySearch(e.target.value);
                                                setCountryDropdownOpen(true);
                                                if (formData.country) setFormData(prev => ({ ...prev, country: '' }));
                                            }}
                                            className="hover-target"
                                            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '12px 0', color: (formData.country || countryDropdownOpen) ? 'var(--text-main)' : 'var(--text-dim)', outline: 'none', fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 300, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                            onFocus={(e) => { e.target.style.borderColor = 'var(--text-main)'; e.target.style.borderBottomWidth = '1.5px'; setCountryDropdownOpen(true); }}
                                            onBlur={(e) => { if (!countryDropdownOpen) { e.target.style.borderColor = 'var(--border-color)'; e.target.style.borderBottomWidth = '1px'; } }}
                                        />

                                        <AnimatePresence>
                                            {countryDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    style={{
                                                        position: 'absolute', top: '100%', left: 0, right: 0,
                                                        background: 'var(--bg-color)',
                                                        backdropFilter: 'blur(20px)',
                                                        border: '1px solid var(--border-color)',
                                                        maxHeight: '260px', overflowY: 'auto', zIndex: 10,
                                                        marginTop: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                                        borderRadius: '2px'
                                                    }}
                                                >
                                                    {filteredCountries.length > 0 ? filteredCountries.map(c => (
                                                        <div
                                                            key={c}
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, country: c }));
                                                                setCountrySearch('');
                                                                setCountryDropdownOpen(false);
                                                            }}
                                                            style={{
                                                                padding: '14px 20px', color: 'var(--text-muted)', cursor: 'pointer',
                                                                borderBottom: '1px solid var(--grid-line)',
                                                                fontSize: '0.9rem', fontFamily: 'var(--font-body)',
                                                                transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => { e.target.style.background = 'var(--grid-line)'; e.target.style.color = 'var(--text-main)'; }}
                                                            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-muted)'; }}
                                                        >
                                                            {c}
                                                        </div>
                                                    )) : (
                                                        <div style={{ padding: '20px', color: 'var(--text-main)', fontSize: '0.85rem', textAlign: 'center' }}>No regions found</div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.2em', fontFamily: 'var(--font-body)', display: 'block', marginBottom: '16px' }}>Project Abstract / Purpose</label>
                                    <textarea
                                        required
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="hover-target"
                                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '12px 0', color: 'var(--text-main)', outline: 'none', fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 300, resize: 'none', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                        onFocus={(e) => { e.target.style.borderColor = 'var(--text-main)'; e.target.style.borderBottomWidth = '1.5px'; }}
                                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.borderBottomWidth = '1px'; }}
                                    />
                                </div>

                                <Turnstile
                                    ref={turnstileRef}
                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                                    onSuccess={setTurnstileToken}
                                    onExpire={() => setTurnstileToken(null)}
                                    options={{ theme: 'auto', size: 'invisible' }}
                                />

                                <motion.button
                                    className="btn-premium hover-target"
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={formState === 'submitting' || !turnstileToken}
                                    style={{
                                        marginTop: '16px',
                                        alignSelf: 'flex-start',
                                        padding: '18px 48px',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

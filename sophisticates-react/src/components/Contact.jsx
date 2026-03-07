import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [formState, setFormState] = useState('idle');
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setCountryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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

        // Business Email Validation
        const domain = formData.email.split('@')[1];
        const personalDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'proton.me',
            'protonmail.com', 'zoho.com', 'yandex.com', 'mail.com', 'gmx.com', 'me.com', 'mac.com', 'live.com'
        ];
        if (domain && personalDomains.includes(domain.toLowerCase())) {
            alert('Please provide a valid business context email address. Personal webmail is not accepted.');
            return;
        }

        setFormState('submitting');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setFormState('success');
                setFormData({ name: '', businessName: '', email: '', country: '', message: '' });
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
        <section id="contact" className="section-padding" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
            <div className="max-w-container grid-stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 10vw, 100px)' }}>

                {/* Left: Info */}
                <div>
                    <h2 style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-main)',
                        marginBottom: 'clamp(40px, 8vw, 60px)'
                    }}>
                        // Initiate Contact
                    </h2>

                    <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--text-main)', lineHeight: '1.4', marginBottom: 'clamp(30px, 6vw, 40px)' }}>
                        Ready to bridge the gap between deep theory and technical reality? Our team is available for research partnerships and enterprise solutions.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vw, 30px)', marginTop: 'clamp(40px, 8vw, 60px)' }}>
                        <div>
                            <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.7rem)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Partnerships / Booking</span>
                            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-main)', margin: '5px 0', wordBreak: 'break-word', marginBottom: '15px' }}>partnerships@sophisticatesai.com</p>

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: 'var(--text-main)', color: 'var(--bg-color)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.open('https://calendly.com/partnerships-sophisticatesai/30min', '_blank')}
                                style={{
                                    padding: 'clamp(10px, 2vw, 12px) clamp(20px, 3vw, 24px)',
                                    background: 'transparent',
                                    border: '1px solid var(--text-main)',
                                    color: 'var(--text-main)',
                                    fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>🗓</span> SCHEDULE CONSULTATION
                            </motion.button>
                        </div>
                        <div>
                            <span style={{ fontSize: 'clamp(0.65rem, 1vw, 0.7rem)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Contact</span>
                            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-main)', margin: '5px 0', wordBreak: 'break-word' }}>hello@sophisticatesai.com</p>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: 'clamp(30px, 5vw, 50px)' }}>
                    {formState === 'success' ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 'clamp(20px, 4vw, 40px)' }}>
                            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 'clamp(15px, 3vw, 20px)' }}>✓</div>
                            <h3 style={{ color: 'var(--text-main)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>Transmission Received</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>Our specialists will analyze and respond shortly.</p>
                            <button onClick={() => setFormState('idle')} style={{ marginTop: 'clamp(20px, 4vw, 30px)', background: 'none', border: '1px solid var(--text-main)', color: 'var(--text-main)', padding: 'clamp(8px, 2vw, 10px) clamp(16px, 3vw, 20px)', cursor: 'none', fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>SEND ANOTHER</button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vw, 30px)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(20px, 4vw, 30px)' }}>
                                <div className="input-group">
                                    <label style={{ fontSize: 'clamp(0.6rem, 1vw, 0.65rem)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '10px' }}>Full Name</label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '10px 0', color: 'var(--text-main)', outline: 'none', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--text-main)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                    />
                                </div>
                                <div className="input-group">
                                    <label style={{ fontSize: 'clamp(0.6rem, 1vw, 0.65rem)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '10px' }}>Organization / Business</label>
                                    <input
                                        required
                                        name="businessName"
                                        type="text"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '10px 0', color: 'var(--text-main)', outline: 'none', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--text-main)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(20px, 4vw, 30px)' }}>
                                <div className="input-group">
                                    <label style={{ fontSize: 'clamp(0.6rem, 1vw, 0.65rem)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '10px' }}>Business Email</label>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@company.com"
                                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '10px 0', color: 'var(--text-main)', outline: 'none', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--text-main)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                    />
                                </div>
                                <div className="input-group" style={{ position: 'relative' }} ref={countryDropdownRef}>
                                    <label style={{ fontSize: 'clamp(0.6rem, 1vw, 0.65rem)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '10px' }}>Country</label>
                                    <input
                                        type="text"
                                        placeholder="Search Country..."
                                        value={countryDropdownOpen ? countrySearch : (formData.country || '')}
                                        onClick={() => setCountryDropdownOpen(true)}
                                        onChange={(e) => {
                                            setCountrySearch(e.target.value);
                                            setCountryDropdownOpen(true);
                                            if (formData.country) setFormData(prev => ({ ...prev, country: '' }));
                                        }}
                                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '10px 0', color: (formData.country || countryDropdownOpen) ? 'var(--text-main)' : 'var(--text-muted)', outline: 'none', fontSize: 'clamp(1rem, 2vw, 1.1rem)', cursor: 'text' }}
                                        onFocus={(e) => { e.target.style.borderColor = 'var(--text-main)'; setCountryDropdownOpen(true); }}
                                    />

                                    <AnimatePresence>
                                        {countryDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                style={{
                                                    position: 'absolute', top: '100%', left: 0, right: 0,
                                                    background: 'var(--bg-color)', border: '1px solid var(--border-color)',
                                                    maxHeight: '220px', overflowY: 'auto', zIndex: 10,
                                                    marginTop: '5px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
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
                                                            padding: '12px 15px', color: '#fff', cursor: 'pointer',
                                                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                            fontSize: '0.9rem'
                                                        }}
                                                        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                                                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                    >
                                                        {c}
                                                    </div>
                                                )) : (
                                                    <div style={{ padding: '12px 15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>No countries found</div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className="input-group">
                                <label style={{ fontSize: 'clamp(0.6rem, 1vw, 0.65rem)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '10px' }}>Nature of Inquiry</label>
                                <textarea
                                    required
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '10px 0', color: 'var(--text-main)', outline: 'none', fontSize: 'clamp(1rem, 2vw, 1.1rem)', resize: 'none' }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--text-main)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: 'var(--text-main)', color: 'var(--bg-color)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={formState === 'submitting'}
                                style={{
                                    marginTop: 'clamp(15px, 3vw, 20px)',
                                    padding: 'clamp(16px, 3vw, 20px)',
                                    background: 'transparent',
                                    border: '1px solid var(--text-main)',
                                    color: 'var(--text-main)',
                                    fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    cursor: 'none'
                                }}
                            >
                                {formState === 'submitting' ? 'TRANSMITTING...' : 'INITIATE CONTACT'}
                            </motion.button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;

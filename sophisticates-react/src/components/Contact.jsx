import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formState, setFormState] = useState('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('submitting');

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setFormState('success');
                setFormData({ name: '', email: '', message: '' });
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
            <div className="max-w-container grid-stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(60px, 10vw, 100px)' }}>

                {/* Left: Info */}
                <div>
                    <h2 style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-main)',
                        marginBottom: '60px'
                    }}>
                        // Initiate Contact
                    </h2>

                    <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', color: 'var(--text-main)', lineHeight: '1.4', marginBottom: '40px' }}>
                        Ready to bridge the gap between deep theory and technical reality? Our team is available for research partnerships and enterprise solutions.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '60px' }}>
                        <div>
                            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Partnerships</span>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: '5px 0' }}>partnerships@sophisticatesai.com</p>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Contact</span>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: '5px 0' }}>hello@sophisticatesai.com</p>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: 'clamp(24px, 5vw, 50px)' }}>
                    {formState === 'success' ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✓</div>
                            <h3 style={{ color: 'var(--text-main)' }}>Transmission Received</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Our specialists will analyze and respond shortly.</p>
                            <button onClick={() => setFormState('idle')} style={{ marginTop: '30px', background: 'none', border: '1px solid var(--text-main)', color: 'var(--text-main)', padding: '10px 20px', cursor: 'none' }}>SEND ANOTHER</button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div className="input-group">
                                <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '10px' }}>Full Name</label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '10px 0', color: 'var(--text-main)', outline: 'none', fontSize: '1.1rem' }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--text-main)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '10px' }}>Email Address</label>
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '10px 0', color: 'var(--text-main)', outline: 'none', fontSize: '1.1rem' }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--text-main)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '10px' }}>Nature of Inquiry</label>
                                <textarea
                                    required
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', padding: '10px 0', color: 'var(--text-main)', outline: 'none', fontSize: '1.1rem', resize: 'none' }}
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
                                    marginTop: '20px',
                                    padding: '20px',
                                    background: 'transparent',
                                    border: '1px solid var(--text-main)',
                                    color: 'var(--text-main)',
                                    fontSize: '0.8rem',
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

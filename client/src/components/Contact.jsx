import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css'

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const socialIconsRef = useRef(null);
    const formRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        // Add animation classes after component mounts
        if (headerRef.current) {
            headerRef.current.classList.add('appear');
        }

        if (socialIconsRef.current) {
            socialIconsRef.current.classList.add('appear');
        }

        if (formRef.current) {
            formRef.current.classList.add('appear');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true);
            setName('');
            setEmail('');
            setMessage('');

            // Reset submission status after showing success message
            setTimeout(() => {
                setSubmitted(false);
            }, 3000);
        }, 600);
    };

    return (
        <div className="contact-container">
            <div className="contact-content">
                <div className="contact-header" ref={headerRef}>
                    <span className="subtitle">Get in Touch</span>
                    <h1>Contact Us</h1>
                    <p className="header-description">
                        We'd love to hear from you. Let us know how we can help with you , feel free to contact us.
                    </p>
                </div>

                <div className="contact-sections">
                    <div className="contact-info">
                        <div className="social-icons" ref={socialIconsRef}>
                            <h3>Connect With Us</h3>
                            <div className="social-links">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <div className="icon linkedin">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                            <rect x="2" y="9" width="4" height="12"></rect>
                                            <circle cx="4" cy="4" r="2"></circle>
                                        </svg>
                                    </div>
                                    <span>LinkedIn</span>
                                </a>

                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <div className="icon twitter">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                        </svg>
                                    </div>
                                    <span>Twitter</span>
                                </a>

                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <div className="icon instagram">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </div>
                                    <span>Instagram</span>
                                </a>

                                <a href="mailto:contact@yourcompany.com" className="social-link">
                                    <div className="icon mail">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    <span>Email Us</span>
                                </a>
                            </div>
                        </div>

                        <div className="address-info">
                            <h3>Visit Our Office</h3>
                            <p>123 Design Studio Street</p>
                            <p>Creative District, CA 91234</p>
                            <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                        </div>
                    </div>

                    <div className="contact-form-container" ref={formRef}>
                        <div className="form-content">
                            <h3>Send Us a Message</h3>

                            {submitted ? (
                                <div className="success-message">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <p>Thank you! Your message has been sent successfully.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Your email address"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                            placeholder="How can we help you?"
                                            rows={6}
                                        />
                                    </div>

                                    <button type="submit" className="submit-button">
                                        <span>Send Message</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="navigation-link">
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
};

export default Contact;

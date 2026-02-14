'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { siteConfig } from '@/data/content';

export default function Footer() {
    const { language } = useLanguage();
    const t = translations[language];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" style={{
            background: 'var(--bru-dark-pearl)',
            color: 'white',
            padding: '80px 0 40px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Accent */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(41, 64, 157, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none'
            }}></div>

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '60px',
                    marginBottom: '60px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {/* Brand Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                            <img src="/logowhite.png" alt="BPao Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                            <div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'white', margin: 0 }}>{siteConfig.shortName}</h3>
                                <div style={{ height: '3px', width: '40px', background: 'var(--gradient-gold)', marginTop: '5px', borderRadius: '10px' }}></div>
                            </div>
                        </div>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.95rem',
                            lineHeight: '1.8',
                            maxWidth: '300px'
                        }}>
                            {t.footer_desc}
                        </p>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            marginBottom: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span style={{ color: 'var(--buriram-gold)' }}>●</span> {t.contact_us}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span style={{ color: 'var(--buriram-gold)', fontSize: '1.1rem' }}>📍</span>
                                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>
                                    {t.address}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span style={{ color: 'var(--buriram-gold)', fontSize: '1.1rem' }}>📞</span>
                                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                                    {siteConfig.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Follow Us Column */}
                    <div>
                        <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            marginBottom: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span style={{ color: 'var(--buriram-gold)' }}>●</span> {t.follow_us}
                        </h4>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="social-link-footer">
                                <span style={{ fontSize: '1.2rem' }}>f</span>
                            </a>
                            {/* Add more social links if needed */}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textAlign: 'center'
                    }}>
                        © {currentYear} {siteConfig.parentOrg}. {t.all_plans}.
                    </div>

                    {/* Visit Counter */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '10px 20px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'var(--transition-base)'
                    }} className="visit-counter">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
                            <path d="M12 20V10" />
                            <path d="M18 20V4" />
                            <path d="M6 20V16" />
                        </svg>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>16962</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.8)' }}>{t.visits}</span>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}

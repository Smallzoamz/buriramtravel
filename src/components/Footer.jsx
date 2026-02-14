'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { siteConfig } from '@/data/content';

export default function Footer() {
    const { language } = useLanguage();
    const t = translations[language];
    const [viewCount, setViewCount] = useState(18542);
    const [currentYear, setCurrentYear] = useState(2026);

    useEffect(() => {
        // Fix hydration: get year on client only
        setCurrentYear(new Date().getFullYear());

        // Simple local visitor counter logic
        const storedCount = localStorage.getItem('buriram_travel_views');
        if (storedCount) {
            const newCount = parseInt(storedCount) + (sessionStorage.getItem('visited_this_session') ? 0 : 1);
            setViewCount(newCount);
            localStorage.setItem('buriram_travel_views', newCount);
        } else {
            localStorage.setItem('buriram_travel_views', '18542');
        }
        sessionStorage.setItem('visited_this_session', 'true');
    }, []);

    return (
        <footer className="footer" style={{
            background: '#0a1d37',
            color: 'white',
            padding: '60px 0 40px',
            position: 'relative'
        }}>
            <div className="container">
                <div className="footer-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '40px',
                    alignItems: 'flex-start'
                }}>
                    {/* Left Column: Brand & Links */}
                    <div>
                        <div style={{ marginBottom: '25px' }}>
                            <img src="/logowhite.png" alt="BPao Logo" style={{ height: '90px', objectFit: 'contain' }} />
                        </div>
                        <p style={{
                            color: 'white',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            marginBottom: '30px',
                            maxWidth: '650px'
                        }}>
                            {t.footer_desc}
                        </p>

                        <div className="footer-links-grid" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '15px 30px',
                            color: 'white',
                            fontSize: '0.95rem'
                        }}>
                            <a href="/attractions" style={{ color: 'white', textDecoration: 'none', borderRight: '1px solid rgba(255,255,255,0.3)', paddingRight: '15px' }}>{t.footer_links?.attractions}</a>
                            <a href="/events" style={{ color: 'white', textDecoration: 'none', borderRight: '1px solid rgba(255,255,255,0.3)', paddingRight: '15px' }}>{t.footer_links?.activities}</a>
                            <a href="/plans" style={{ color: 'white', textDecoration: 'none', borderRight: '1px solid rgba(255,255,255,0.3)', paddingRight: '15px' }}>{t.footer_links?.plans}</a>
                            <a href="/map" style={{ color: 'white', textDecoration: 'none' }}>{t.footer_links?.map}</a>
                            <div style={{ width: '100%', height: '0' }}></div>
                            <a href="#" style={{ color: 'white', textDecoration: 'none', borderRight: '1px solid rgba(255,255,255,0.3)', paddingRight: '15px' }}>{t.footer_links?.business}</a>
                            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>{t.footer_links?.contact}</a>
                        </div>
                    </div>

                    {/* Right Column: Contact */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px' }}>{t.contact_us}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '1.2rem' }}>📍</span>
                                <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: '1.5', opacity: 0.9 }}>
                                    {t.address}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2rem' }}>📞</span>
                                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9 }}>
                                    {siteConfig.phone}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2rem' }}>✉️</span>
                                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9 }}>
                                    {siteConfig.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Counter */}
                <div style={{
                    marginTop: '50px',
                    paddingTop: '30px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                        © {currentYear} {siteConfig.parentOrg}. {t.all_plans}
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                    }}>
                        <span style={{ fontWeight: '700' }}>{viewCount.toLocaleString()}</span>
                        <span style={{ opacity: 0.8 }}>{t.visits}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

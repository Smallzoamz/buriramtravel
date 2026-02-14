'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig, tourismCategories } from '@/data/content';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const t = translations[language];
    const pathname = usePathname();
    const isHome = pathname === '/';

    const languages = [
        { code: 'TH', name: 'ภาษาไทย', flagCode: 'th' },
        { code: 'EN', name: 'English', flagCode: 'us' },
        { code: 'ZH', name: '中文', flagCode: 'cn' },
        { code: 'JP', name: '日本語', flagCode: 'jp' }
    ];

    const getFlagUrl = (flagCode) => `https://flagcdn.com/w80/${flagCode}.png`;

    useEffect(() => {
        if (!isHome) {
            setIsScrolled(true);
            return;
        }
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    const currentLang = languages.find(l => l.code === language);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : 'transparent'}`}>
            <div className="container">
                <div className="header-top-inner" style={{ height: '80px' }}>
                    <a href="https://bpao.vercel.app/" className="header-logo" style={{ textDecoration: 'none' }}>
                        <img src={isScrolled ? "/logo.png" : "/logowhite.png"} alt="BPao Logo" className="logo-img" />
                        <div className="logo-text">
                            <h1 style={{ fontSize: '1.25rem', color: isScrolled ? 'var(--primary-dark)' : 'white' }}>{siteConfig.shortName}</h1>
                            <span style={{ fontSize: '0.8rem', color: isScrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.8)' }}>{siteConfig.nameEn}</span>
                        </div>
                    </a>

                    <nav className="nav-desktop">
                        <a href="/" className="nav-item active">{t.home}</a>
                        <a href="/attractions" className="nav-item">{t.attractions}</a>
                        <a href="/events" className="nav-item">{t.events}</a>
                        <a href="/plans" className="nav-item">{t.plans}</a>
                        <a href="/map" className="nav-item">{t.map}</a>
                    </nav>

                    <div className="nav-desktop">
                        <div className="lang-selector">
                            <div className="lang-current">
                                <img
                                    src={getFlagUrl(currentLang?.flagCode)}
                                    alt={currentLang?.name}
                                    className="lang-flag-img"
                                />
                                <span className="lang-arrow">▼</span>
                            </div>
                            <div className="lang-dropdown">
                                {languages.map(lang => (
                                    <div
                                        key={lang.code}
                                        className={`lang-option ${language === lang.code ? 'active' : ''}`}
                                        onClick={() => setLanguage(lang.code)}
                                    >
                                        <img
                                            src={getFlagUrl(lang.flagCode)}
                                            alt={lang.name}
                                            className="lang-flag-img"
                                        />
                                        <span className="lang-name">{lang.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span style={{ background: isScrolled ? 'var(--primary-dark)' : 'white' }}></span>
                        <span style={{ background: isScrolled ? 'var(--primary-dark)' : 'white' }}></span>
                        <span style={{ background: isScrolled ? 'var(--primary-dark)' : 'white' }}></span>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <nav>
                    <a href="/" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)} style={{ color: 'white' }}>{t.home}</a>
                    <a href="/attractions" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)} style={{ color: 'white' }}>{t.attractions}</a>
                    <a href="/events" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)} style={{ color: 'white' }}>{t.events}</a>
                    <a href="/plans" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)} style={{ color: 'white' }}>{t.plans}</a>
                    <a href="/map" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)} style={{ color: 'white' }}>{t.map}</a>

                    <div className="mobile-lang-selector">
                        {languages.map(lang => (
                            <button
                                key={lang.code}
                                className={`mobile-lang-btn ${language === lang.code ? 'active' : ''}`}
                                onClick={() => { setLanguage(lang.code); setIsMenuOpen(false); }}
                            >
                                <img
                                    src={getFlagUrl(lang.flagCode)}
                                    alt={lang.name}
                                    className="lang-flag-img"
                                />
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
}

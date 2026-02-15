'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner with a slight delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const content = {
        TH: {
            title: 'การใช้คุกกี้ (Cookies)',
            message: 'เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีในการใช้งานเว็บไซต์ ท่านสามารถศึกษารายละเอียดการใช้คุกกี้ได้ที่ "นโยบายการใช้คุกกี้" ของเรา',
            accept: 'ยอมรับทั้งหมด',
            decline: 'ปฏิเสธ'
        },
        EN: {
            title: 'Cookie Consent',
            message: 'We use cookies to improve your experience on our website. By using our site, you agree to our use of cookies as described in our Privacy Policy.',
            accept: 'Accept All',
            decline: 'Decline'
        },
        ZH: {
            title: 'Cookie 同意',
            message: '我们使用 Cookie 来改善您在我们网站上的体验。通过使用我们的网站，您同意我们按照隐私政策中所述使用 Cookie。',
            accept: '全部接受',
            decline: '拒绝'
        },
        JP: {
            title: 'クッキーの使用について',
            message: '当ウェブサイトでは、お客様の利便性向上や体験改善のためにクッキーを使用しています。サイトを利用することで、プライバシーポリシーに記載されたクッキーの使用に同意したものとみなされます。',
            accept: 'すべて同意',
            decline: '拒否'
        }
    };

    const t = content[language] || content.TH;

    return (
        <div className="cookie-consent-wrapper">
            <div className="cookie-consent-card">
                <div className="cookie-consent-content">
                    <div className="cookie-consent-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                            <path d="M8.5 8.5v.01" />
                            <path d="M16 15.5v.01" />
                            <path d="M12 12v.01" />
                            <path d="M11 17v.01" />
                            <path d="M7 14v.01" />
                        </svg>
                    </div>
                    <div className="cookie-consent-text">
                        <h3>{t.title}</h3>
                        <p>{t.message}</p>
                    </div>
                </div>
                <div className="cookie-consent-actions">
                    <button className="cookie-btn-decline" onClick={handleDecline}>
                        {t.decline}
                    </button>
                    <button className="cookie-btn-accept" onClick={handleAccept}>
                        {t.accept}
                    </button>
                </div>
            </div>
        </div>
    );
}

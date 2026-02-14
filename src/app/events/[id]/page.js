'use client';

import { useLanguage } from '@/context/LanguageContext';
import { eventsData } from '@/data/eventsData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for Map at the top-level to ensure correct DOM management and avoid SSR issues
const EventMap = dynamic(() => import('@/components/EventMap'), {
    ssr: false,
    loading: () => (
        <div style={{ height: '350px', background: '#f5f5f5', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Loading map...</p>
        </div>
    )
});

export default function EventDetailPage({ params }) {
    const { id } = use(params);
    const { language } = useLanguage();
    const isEn = language === 'EN';
    const router = useRouter();

    const event = eventsData.find(e => e.id === id);

    if (!event) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>{isEn ? 'Event Not Found' : 'ไม่พบข้อมูลกิจกรรม'}</h2>
                <Link href="/events" className="btn-outline">
                    {isEn ? 'Back to Events' : 'กลับไปที่หน้ากิจกรรม'}
                </Link>
            </div>
        );
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <main className="event-detail-page">
            {/* Breadcrumb Section */}
            <div className="event-breadcrumb-wrapper">
                <div className="container">
                    <div className="attractions-breadcrumb">
                        <Link href="/" className="map-breadcrumb-link">
                            {isEn ? 'Home' : 'หน้าแรก'}
                        </Link>
                        <span className="map-breadcrumb-sep">/</span>
                        <Link href="/events" className="map-breadcrumb-link">
                            {isEn ? 'Events Calendar' : 'ปฏิทินกิจกรรม'}
                        </Link>
                        <span className="map-breadcrumb-sep">/</span>
                        <span className="map-breadcrumb-current">
                            {isEn ? event.titleEn : event.title}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="event-detail-hero">
                <div className="event-hero-overlay"></div>
                <img src={event.image} alt={isEn ? event.titleEn : event.title} className="event-hero-img" />

                <div className="container event-hero-content">
                    <div className="event-hero-tags">
                        <span className="event-tag-hero">
                            {isEn ? event.categoryLabelEn : event.categoryLabel}
                        </span>
                    </div>
                    <h1 className="event-detail-title">
                        {isEn ? event.titleEn : event.title}
                    </h1>
                    <div className="event-hero-meta">
                        <div className="event-meta-item">
                            <span className="icon">📅</span>
                            {isEn ? event.dateRangeEn : event.dateRange}
                        </div>
                        <div className="event-meta-item">
                            <span className="icon">📍</span>
                            {isEn ? event.locationEn : event.location}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container event-detail-container">
                <div className="event-detail-layout">
                    {/* Share Components */}
                    <aside className="event-detail-sidebar">
                        <div className="event-share-box">
                            <span className="share-label">{isEn ? 'Share this event' : 'แชร์กิจกรรมนี้'}</span>
                            <div className="share-buttons">
                                <button className="share-btn-pill">
                                    <div className="icon-wrapper">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </div>
                                    Facebook
                                </button>
                                <button className="share-btn-pill">
                                    <div className="icon-wrapper">
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    </div>
                                    X (Twitter)
                                </button>
                                <button className="share-btn-pill" onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                    alert(isEn ? 'Link copied!' : 'คัดลอกลิงก์เรียบร้อย!');
                                }}>
                                    <div className="icon-wrapper">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    </div>
                                    {isEn ? 'Copy Link' : 'คัดลอกลิงก์'}
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <article className="event-detail-content">
                        <div className="event-content-body white-space-pre">
                            {isEn ? event.contentEn || event.content : event.content}
                        </div>

                        {/* Poster */}
                        {event.poster && (
                            <div className="event-poster-wrapper">
                                <img src={event.poster} alt="Event Poster" className="event-poster-img" />
                            </div>
                        )}

                        {/* Location Section */}
                        <div className="event-location-section">
                            <h2 className="section-title-small">📍 {isEn ? 'Event Location' : 'สถานที่จัดกิจกรรม'}</h2>
                            <p className="event-address-text">{isEn ? event.locationEn : event.location}</p>
                            <p className="event-address-detail">{event.address}</p>

                            <div className="event-map-container">
                                <EventMap coords={event.mapCoords} title={isEn ? event.titleEn : event.title} />
                            </div>

                            <div className="event-location-actions">
                                <button className="btn-pill-outline" onClick={() => {
                                    window.open(`https://www.google.com/maps/search/?api=1&query=${event.mapCoords.lat},${event.mapCoords.lng}`, '_blank');
                                }}>
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 20l-5.447-2.724A2 2 0 013 15.492V4.508a2 2 0 011.553-1.954L9 1l6 3 5.447-2.724A2 2 0 0121 3.232v10.984a2 2 0 01-1.553 1.954L15 19l-6 1z" />
                                        <path d="M9 1v19M15 4v15" />
                                    </svg>
                                    {isEn ? 'View Map' : 'ดูแผนที่'}
                                </button>
                                <button className="btn-pill-outline">
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {isEn ? 'Share Location' : 'แชร์เส้นทาง'}
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <Link href="/events" className="btn-outline">
                    ← {isEn ? 'Back to all events' : 'กลับไปหน้ารวมกิจกรรม'}
                </Link>
            </div>
        </main>
    );
}

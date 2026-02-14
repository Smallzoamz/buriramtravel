'use client';

import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { mockAttractions, attractionCategories } from '@/data/attractionsMockup';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AttractionDetailPage() {
    const { id } = useParams();
    const { language } = useLanguage();
    const isEn = language === 'EN';

    const attraction = mockAttractions.find(a => a.id === id);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!attraction) {
        return (
            <main className="attractions-page">
                <div className="attractions-content">
                    <div className="container">
                        <div className="attractions-empty">
                            <span style={{ fontSize: '3rem' }}>😕</span>
                            <h3>{isEn ? 'Attraction not found' : 'ไม่พบข้อมูลสถานที่'}</h3>
                            <p>
                                <Link href="/attractions" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                    {isEn ? '← Back to all attractions' : '← กลับไปหน้าสถานที่ท่องเที่ยว'}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const category = attractionCategories.find(c => c.id === attraction.category);
    const googleMapsUrl = `https://www.google.com/maps?q=${attraction.lat},${attraction.lng}`;
    const embedMapUrl = `https://maps.google.com/maps?q=${attraction.lat},${attraction.lng}&z=15&output=embed`;

    return (
        <main className="attractions-page">
            {/* Breadcrumb */}
            <div className="detail-breadcrumb-bar">
                <div className="container">
                    <div className="attractions-breadcrumb">
                        <Link href="/" className="map-breadcrumb-link">
                            {isEn ? 'Home' : 'หน้าแรก'}
                        </Link>
                        <span className="map-breadcrumb-sep">/</span>
                        <Link href="/attractions" className="map-breadcrumb-link">
                            {isEn ? 'Tourist Attractions' : 'สถานที่ท่องเที่ยว'}
                        </Link>
                        <span className="map-breadcrumb-sep">/</span>
                        <span className="map-breadcrumb-current">
                            {isEn ? attraction.titleEn : attraction.title}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="detail-hero">
                <div className="container">
                    <div className="detail-hero-grid">
                        {/* Left: Info */}
                        <div className="detail-hero-info">
                            <div className="detail-category-badge">
                                {category?.icon} {isEn ? category?.titleEn : category?.title}
                            </div>
                            <h1 className="detail-title">
                                {isEn ? attraction.titleEn : attraction.title}
                            </h1>
                            <p className="detail-district">
                                {isEn ? attraction.districtEn : attraction.district}
                            </p>
                            <p className="detail-description">
                                {isEn ? attraction.descriptionEn : attraction.description}
                            </p>
                            <div className="detail-open-hours">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>{isEn ? attraction.openHoursEn : attraction.openHours}</span>
                            </div>
                            <div className="detail-actions">
                                {attraction.facebook && (
                                    <a href={attraction.facebook} target="_blank" rel="noopener noreferrer" className="detail-btn detail-btn-facebook">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                        {isEn ? 'View Page' : 'ดูเพจ'}
                                    </a>
                                )}
                                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="detail-btn detail-btn-map">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    {isEn ? 'View Map' : 'ดูแผนที่'}
                                </a>
                            </div>
                        </div>
                        {/* Right: Image */}
                        <div className="detail-hero-image">
                            <img
                                src={attraction.image}
                                alt={isEn ? attraction.titleEn : attraction.title}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Description + Map */}
            <div className="detail-body">
                <div className="container">
                    <p className="detail-full-description">
                        {isEn ? attraction.fullDescriptionEn : attraction.fullDescription}
                    </p>

                    <div className="detail-map-embed">
                        <iframe
                            src={embedMapUrl}
                            width="100%"
                            height="400"
                            style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={isEn ? attraction.titleEn : attraction.title}
                        ></iframe>
                    </div>

                    {/* Share Bar */}
                    <div className="detail-share-bar">
                        <span className="detail-share-label">
                            {isEn ? 'Share this attraction' : 'แชร์สถานที่ท่องเที่ยวนี้'}
                        </span>
                        <div className="detail-share-icons">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="detail-share-icon"
                                title="Facebook"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(isEn ? attraction.titleEn : attraction.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="detail-share-icon"
                                title="X"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                            </a>
                            <button
                                className="detail-share-icon"
                                title={isEn ? 'Copy link' : 'คัดลอกลิงก์'}
                                onClick={() => {
                                    if (typeof navigator !== 'undefined') {
                                        navigator.clipboard.writeText(window.location.href);
                                    }
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="detail-share-route">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {isEn ? 'Share Route' : 'แชร์เส้นทาง'}
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

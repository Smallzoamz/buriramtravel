'use client';

import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { mockPlans } from '@/data/plansMockup';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamic import สำหรับ map (ไม่ใช้ SSR)
const PlanMapView = dynamic(() => import('@/components/PlanMapView'), { ssr: false });

export default function PlanDetailPage() {
    const { id } = useParams();
    const { language } = useLanguage();
    const isEn = language === 'EN';

    const plan = mockPlans.find(p => p.id === id);
    const [hoveredSpot, setHoveredSpot] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!plan) {
        return (
            <main className="plans-page">
                <div className="plans-content">
                    <div className="container">
                        <div className="attractions-empty">
                            <span style={{ fontSize: '3rem' }}>😕</span>
                            <h3>{isEn ? 'Plan not found' : 'ไม่พบข้อมูลแผนท่องเที่ยว'}</h3>
                            <p>
                                <Link href="/plans" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                    {isEn ? '← Back to all plans' : '← กลับไปหน้าแผนท่องเที่ยว'}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="plans-page">
            {/* Breadcrumb */}
            <div className="detail-breadcrumb-bar">
                <div className="container">
                    <div className="attractions-breadcrumb">
                        <Link href="/" className="map-breadcrumb-link">
                            {isEn ? 'Home' : 'หน้าแรก'}
                        </Link>
                        <span className="map-breadcrumb-sep">/</span>
                        <Link href="/plans" className="map-breadcrumb-link">
                            {isEn ? 'Travel Plans' : 'แผนท่องเที่ยว'}
                        </Link>
                        <span className="map-breadcrumb-sep">/</span>
                        <span className="map-breadcrumb-current">
                            {isEn ? plan.titleEn : plan.title}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="plan-detail-content">
                <div className="container">
                    <div className="plan-detail-grid">
                        {/* Left: Info + Spots */}
                        <div className="plan-detail-left">
                            {/* Hero Image */}
                            <div className="plan-detail-hero">
                                <img
                                    src={plan.image}
                                    alt={isEn ? plan.titleEn : plan.title}
                                />
                            </div>

                            {/* Tags */}
                            <div className="plan-detail-tags">
                                {plan.tags.map((tag, i) => (
                                    <span key={i} className="plan-card-tag">
                                        {tag.icon} {isEn ? tag.titleEn : tag.title}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="plan-detail-title">
                                {isEn ? plan.titleEn : plan.title}
                            </h1>

                            {/* Spot Count */}
                            <p className="plan-detail-count">
                                📍 {plan.spots.length} {isEn ? 'places' : 'สถานที่'}
                            </p>

                            {/* Description */}
                            <p className="plan-detail-desc">
                                {isEn ? plan.descriptionEn : plan.description}
                            </p>

                            <hr className="plan-detail-divider" />

                            {/* Spots List */}
                            <div className="plan-spots-list">
                                {plan.spots.map((spot, index) => (
                                    <div
                                        key={index}
                                        className={`plan-spot-item ${hoveredSpot === index ? 'active' : ''}`}
                                        onMouseEnter={() => setHoveredSpot(index)}
                                        onMouseLeave={() => setHoveredSpot(null)}
                                    >
                                        <div className="plan-spot-marker">
                                            <span className="plan-spot-dot"></span>
                                            <span className="plan-spot-label">
                                                {isEn ? `Stop ${index + 1}` : `จุดที่ ${index + 1}`}
                                            </span>
                                        </div>
                                        <div className="plan-spot-card">
                                            <div className="plan-spot-image">
                                                <img src={spot.image} alt={isEn ? spot.titleEn : spot.title} loading="lazy" />
                                                <span className="plan-spot-badge">
                                                    {isEn ? spot.categoryEn : spot.category}
                                                </span>
                                            </div>
                                            <div className="plan-spot-info">
                                                <h4 className="plan-spot-title">
                                                    {isEn ? spot.titleEn : spot.title}
                                                </h4>
                                                <p className="plan-spot-desc">
                                                    {isEn ? spot.descriptionEn : spot.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Map */}
                        <div className="plan-detail-right">
                            <div className="plan-detail-map-sticky">
                                <PlanMapView
                                    spots={plan.spots}
                                    isEn={isEn}
                                    hoveredSpot={hoveredSpot}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

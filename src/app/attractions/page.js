'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { mockAttractions, attractionCategories } from '@/data/attractionsMockup';
import Link from 'next/link';

export default function AttractionsPage() {
    const { language } = useLanguage();
    const t = translations[language];
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const isEn = language === 'EN';

    // Filter attractions
    const filteredAttractions = mockAttractions.filter(a => {
        const matchCategory = activeCategory === 'all' || a.category === activeCategory;
        const title = isEn ? a.titleEn : a.title;
        const matchSearch = !searchQuery || title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const getCategoryInfo = (catId) => attractionCategories.find(c => c.id === catId);

    return (
        <main className="attractions-page">
            {/* Hero Header */}
            <div className="attractions-header">
                <div className="container">
                    {/* Breadcrumb */}
                    <div className="attractions-breadcrumb">
                        <Link href="/" className="map-breadcrumb-link">
                            {isEn ? 'Home' : 'หน้าแรก'}
                        </Link>
                        <span className="map-breadcrumb-sep">/</span>
                        <span className="map-breadcrumb-current">
                            {isEn ? 'Tourist Attractions' : 'สถานที่ท่องเที่ยว'}
                        </span>
                    </div>

                    {/* Title + Search */}
                    <div className="attractions-title-row">
                        <div>
                            <h1 className="attractions-title">
                                {isEn ? (
                                    <>Tourist Attractions in <span className="text-accent">Buriram</span></>
                                ) : (
                                    <>สถานที่<span className="text-accent">เที่ยวบุรีรัมย์</span></>
                                )}
                            </h1>
                            <p className="attractions-subtitle">
                                {isEn
                                    ? 'Discover amazing places in Buriram — from ancient Khmer temples to world-class sports venues, nature parks, and local culture.'
                                    : 'สัมผัสมนต์เสน่ห์กับหลากหลายที่เที่ยวบุรีรัมย์ ไม่ว่าจะเป็นปราสาทหินขอมพันปี สนามกีฬาระดับโลก ธรรมชาติอันอุดม หรือวิถีชุมชนอันรุ่มรวย'
                                }
                            </p>
                        </div>
                        <div className="attractions-search-box">
                            <svg className="attractions-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                placeholder={isEn ? 'Search places...' : 'ค้นหาชื่อสถานที่'}
                                className="attractions-search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="attractions-categories">
                        {attractionCategories.map(cat => (
                            <button
                                key={cat.id}
                                className={`attractions-pill ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <span className="attractions-pill-icon">{cat.icon}</span>
                                {isEn ? cat.titleEn : cat.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Attraction Cards Grid */}
            <div className="attractions-content">
                <div className="container">
                    {filteredAttractions.length === 0 ? (
                        <div className="attractions-empty">
                            <span style={{ fontSize: '3rem' }}>🔍</span>
                            <h3>{isEn ? 'No results found' : 'ไม่พบสถานที่ที่ค้นหา'}</h3>
                            <p>{isEn ? 'Try changing your filters or search terms.' : 'ลองเปลี่ยนตัวกรองหรือคำค้นหา'}</p>
                        </div>
                    ) : (
                        <div className="attractions-grid">
                            {filteredAttractions.map(attraction => {
                                const cat = getCategoryInfo(attraction.category);
                                return (
                                    <Link
                                        key={attraction.id}
                                        href={`/attractions/${attraction.id}`}
                                        className="attraction-card"
                                    >
                                        <div className="attraction-card-image">
                                            <img
                                                src={attraction.image}
                                                alt={isEn ? attraction.titleEn : attraction.title}
                                                loading="lazy"
                                            />
                                            <div className="attraction-card-badge">
                                                {cat?.icon} {isEn ? cat?.titleEn : cat?.title}
                                            </div>
                                            {attraction.rating && (
                                                <div className="attraction-card-rating">
                                                    ⭐ {attraction.rating}
                                                </div>
                                            )}
                                        </div>
                                        <div className="attraction-card-body">
                                            <h3 className="attraction-card-title">
                                                {isEn ? attraction.titleEn : attraction.title}
                                            </h3>
                                            <p className="attraction-card-location">
                                                📍 {isEn ? attraction.districtEn : attraction.district}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

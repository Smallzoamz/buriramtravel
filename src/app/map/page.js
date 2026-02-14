'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import Link from 'next/link';

// Dynamic import — Leaflet needs browser APIs (window, document)
const MapView = dynamic(() => import('@/components/MapView'), {
    ssr: false,
    loading: () => (
        <div className="map-loading">
            <div className="map-loading-spinner"></div>
            <p>กำลังโหลดแผนที่...</p>
        </div>
    )
});

export default function MapPage() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <main className="map-page">
            {/* Breadcrumb */}
            <div className="map-breadcrumb">
                <div className="container">
                    <Link href="/" className="map-breadcrumb-link">
                        {language === 'EN' ? 'Home' :
                            language === 'ZH' ? '首页' :
                                language === 'JP' ? 'ホーム' : 'หน้าแรก'}
                    </Link>
                    <span className="map-breadcrumb-sep">/</span>
                    <span className="map-breadcrumb-current">
                        {language === 'EN' ? 'Map of Buriram' :
                            language === 'ZH' ? '武里南地图' :
                                language === 'JP' ? 'ブリーラム地図' : 'แผนที่บุรีรัมย์'}
                    </span>
                </div>
            </div>

            {/* Map */}
            <MapView />
        </main>
    );
}

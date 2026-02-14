'use client';

import { useLanguage } from '@/context/LanguageContext';
import { mockPlans } from '@/data/plansMockup';
import Link from 'next/link';

export default function PlansPage() {
    const { language } = useLanguage();
    const isEn = language === 'EN';

    return (
        <main className="plans-page">
            {/* Header */}
            <div className="plans-header">
                <div className="container">
                    <div className="attractions-breadcrumb">
                        <Link href="/" className="map-breadcrumb-link">
                            {isEn ? 'Home' : 'หน้าแรก'}
                        </Link>
                        <span className="map-breadcrumb-sep">/</span>
                        <span className="map-breadcrumb-current">
                            {isEn ? 'Travel Plans' : 'แผนท่องเที่ยว'}
                        </span>
                    </div>

                    <h1 className="plans-title">
                        {isEn ? (
                            <>Travel Plans in <span className="text-accent">Buriram</span></>
                        ) : (
                            <>แผนท่องเที่ยว<span className="text-accent">บุรีรัมย์</span></>
                        )}
                    </h1>
                    <p className="plans-subtitle">
                        {isEn
                            ? 'Curated travel itineraries in Buriram with recommended routes for smooth trips and unforgettable experiences.'
                            : 'จัดเต็มเส้นทางท่องเที่ยวในบุรีรัมย์ พร้อมเส้นทางแนะนำเพื่อการเดินทางที่ราบรื่น และสร้างความทรงจำสุดประทับใจที่ไม่มีวันลืม'
                        }
                    </p>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="plans-content">
                <div className="container">
                    <div className="plans-grid">
                        {mockPlans.map(plan => (
                            <Link
                                key={plan.id}
                                href={`/plans/${plan.id}`}
                                className="plan-card"
                            >
                                <div className="plan-card-image">
                                    <img
                                        src={plan.image}
                                        alt={isEn ? plan.titleEn : plan.title}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="plan-card-body">
                                    <div className="plan-card-tags">
                                        {plan.tags.map((tag, i) => (
                                            <span key={i} className="plan-card-tag">
                                                {tag.icon} {isEn ? tag.titleEn : tag.title}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="plan-card-title">
                                        {isEn ? plan.titleEn : plan.title}
                                    </h3>
                                    <p className="plan-card-desc">
                                        {isEn ? plan.descriptionEn : plan.description}
                                    </p>
                                    <p className="plan-card-spots">
                                        📍 {plan.spots.length} {isEn ? 'places' : 'สถานที่'}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

// Event Categories
const eventCategories = [
    { id: 'all', title: 'ทั้งหมด', titleEn: 'All' },
    { id: 'culture', title: 'วัฒนธรรม', titleEn: 'Culture' },
    { id: 'sports', title: 'ท่องเที่ยวเชิงกีฬา', titleEn: 'Sports Tourism' },
    { id: 'festival', title: 'เทศกาลประเพณี', titleEn: 'Festivals' },
    { id: 'community', title: 'วิถีชุมชน', titleEn: 'Community' },
    { id: 'creative', title: 'ประสบการณ์เชิงสร้างสรรค์', titleEn: 'Creative Experience' },
    { id: 'nature', title: 'ท่องเที่ยวเชิงธรรมชาติ', titleEn: 'Nature Tourism' },
];

// Months
const months = [
    { value: 'all', label: 'เดือนทั้งหมด', labelEn: 'All months' },
    { value: '1', label: 'มกราคม', labelEn: 'January' },
    { value: '2', label: 'กุมภาพันธ์', labelEn: 'February' },
    { value: '3', label: 'มีนาคม', labelEn: 'March' },
    { value: '4', label: 'เมษายน', labelEn: 'April' },
    { value: '5', label: 'พฤษภาคม', labelEn: 'May' },
    { value: '6', label: 'มิถุนายน', labelEn: 'June' },
    { value: '7', label: 'กรกฎาคม', labelEn: 'July' },
    { value: '8', label: 'สิงหาคม', labelEn: 'August' },
    { value: '9', label: 'กันยายน', labelEn: 'September' },
    { value: '10', label: 'ตุลาคม', labelEn: 'October' },
    { value: '11', label: 'พฤศจิกายน', labelEn: 'November' },
    { value: '12', label: 'ธันวาคม', labelEn: 'December' },
];

// Mockup Events — ข้อมูลตัวอย่างกิจกรรม
const mockEvents = [
    {
        id: 'phanom-rung-festival',
        title: 'ประเพณีขึ้นเขาพนมรุ้ง',
        titleEn: 'Phanom Rung Festival',
        category: 'festival',
        month: 4,
        dateRange: '2-5 เม.ย. 2569',
        dateRangeEn: 'Apr 2-5, 2026',
        day: '02',
        monthShort: 'เม.ย.',
        monthShortEn: 'APR',
        location: 'อุทยานประวัติศาสตร์พนมรุ้ง',
        locationEn: 'Phanom Rung Historical Park',
        description: 'ชมปรากฏการณ์ดวงอาทิตย์ขึ้นตรง 15 ช่องประตูปราสาท ขบวนแห่อลังการ การแสดงแสง สี เสียง',
        descriptionEn: 'Witness the sun rise through the 15 doorways of the Khmer sanctuary. Includes spectacular parades and light & sound shows.',
        image: 'https://images.unsplash.com/photo-1555436169-20e93ea9a7ff?q=80&w=600',
    },
    {
        id: 'buriram-marathon',
        title: 'บุรีรัมย์มาราธอน',
        titleEn: 'Buriram Marathon',
        category: 'sports',
        month: 2,
        dateRange: '15 ก.พ. 2569',
        dateRangeEn: 'Feb 15, 2026',
        day: '15',
        monthShort: 'ก.พ.',
        monthShortEn: 'FEB',
        location: 'สนามช้างอารีนา',
        locationEn: 'Chang Arena',
        description: 'วิ่งมาราธอนรอบสนามช้างอารีนาและเซอร์กิต เส้นทางสวยงาม บรรยากาศเมืองกีฬา',
        descriptionEn: 'Marathon around Chang Arena and Circuit. Beautiful route through the sports city.',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600',
    },
    {
        id: 'khon-buriram-games',
        title: 'ฅนบุรีรัมย์เกมส์ 2569',
        titleEn: 'Khon Buriram Games 2026',
        category: 'sports',
        month: 2,
        dateRange: '5-12 ก.พ. 2569',
        dateRangeEn: 'Feb 5-12, 2026',
        day: '05',
        monthShort: 'ก.พ.',
        monthShortEn: 'FEB',
        location: 'สนามกีฬากลาง อบจ.บุรีรัมย์',
        locationEn: 'Buriram PAO Stadium',
        description: 'การแข่งขันกีฬานักเรียน นักศึกษาแห่งชาติ ครั้งที่ 45',
        descriptionEn: 'The 45th National Student Sports Competition.',
        image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8ba8c5?q=80&w=600',
    },
    {
        id: 'songkran-buriram',
        title: 'สงกรานต์บุรีรัมย์',
        titleEn: 'Songkran Buriram',
        category: 'culture',
        month: 4,
        dateRange: '13-15 เม.ย. 2569',
        dateRangeEn: 'Apr 13-15, 2026',
        day: '13',
        monthShort: 'เม.ย.',
        monthShortEn: 'APR',
        location: 'หน้าที่ว่าการอำเภอเมืองบุรีรัมย์',
        locationEn: 'Mueang Buriram District Office',
        description: 'เทศกาลสงกรานต์ สืบสานประเพณีสรงน้ำพระ รดน้ำดำหัวผู้ใหญ่ ขบวนแห่สงกรานต์',
        descriptionEn: 'Traditional Songkran festival with bathing Buddha ceremonies and parades.',
        image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=600',
    },
    {
        id: 'silk-fair',
        title: 'งานวันผ้าไหมบุรีรัมย์',
        titleEn: 'Buriram Silk Fair',
        category: 'community',
        month: 8,
        dateRange: '1-5 ส.ค. 2569',
        dateRangeEn: 'Aug 1-5, 2026',
        day: '01',
        monthShort: 'ส.ค.',
        monthShortEn: 'AUG',
        location: 'ศาลากลางจังหวัดบุรีรัมย์',
        locationEn: 'Buriram Provincial Hall',
        description: 'งานแสดงผ้าไหมทอมือ ศิลปหัตถกรรมชุมชน สาธิตการทอผ้า และจำหน่ายสินค้าโอทอป',
        descriptionEn: 'Handwoven silk exhibition, community crafts demonstrations, and OTOP marketplace.',
        image: 'https://images.unsplash.com/photo-1558171013-2445e3f3f9dc?q=80&w=600',
    },
    {
        id: 'motogp',
        title: 'MotoGP บุรีรัมย์',
        titleEn: 'MotoGP Buriram',
        category: 'sports',
        month: 10,
        dateRange: '24-26 ต.ค. 2569',
        dateRangeEn: 'Oct 24-26, 2026',
        day: '24',
        monthShort: 'ต.ค.',
        monthShortEn: 'OCT',
        location: 'สนามช้าง อินเตอร์เนชั่นแนล เซอร์กิต',
        locationEn: 'Chang International Circuit',
        description: 'การแข่งรถจักรยานยนต์ทางเรียบชิงแชมป์โลก FIM MotoGP',
        descriptionEn: 'FIM MotoGP World Championship motorcycle racing event.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600',
    },
];

export default function EventsPage() {
    const { language } = useLanguage();
    const isEn = language === 'EN';
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState('all');

    // Filter events
    const filteredEvents = mockEvents.filter(e => {
        const matchCategory = activeCategory === 'all' || e.category === activeCategory;
        const matchMonth = selectedMonth === 'all' || e.month === parseInt(selectedMonth);
        return matchCategory && matchMonth;
    });

    return (
        <main className="events-page">
            {/* Header */}
            <div className="events-header">
                <div className="container">
                    {/* Breadcrumb */}
                    <div className="attractions-breadcrumb">
                        <Link href="/" className="map-breadcrumb-link">
                            {isEn ? 'Home' : 'หน้าแรก'}
                        </Link>
                        <span className="map-breadcrumb-sep">/</span>
                        <span className="map-breadcrumb-current">
                            {isEn ? 'Events Calendar' : 'ปฏิทินกิจกรรม'}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="events-title">
                        {isEn ? (
                            <>Exciting Events in <span className="text-accent">Buriram</span></>
                        ) : (
                            <>กิจกรรมน่าสนใจ<span className="text-accent">ในบุรีรัมย์</span></>
                        )}
                    </h1>
                    <p className="events-subtitle">
                        {isEn
                            ? 'Discover year-round festivals, sports events, and cultural experiences that make Buriram a must-visit destination.'
                            : 'รวมเทศกาลเด่นตลอดปีของบุรีรัมย์ เปิดประสบการณ์สุดพิเศษที่จะทำให้คุณตกหลุมรัก เสน่ห์อันเป็นเอกลักษณ์ของเมืองกีฬาแห่งนี้'
                        }
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="events-filters">
                <div className="container">
                    <div className="events-filters-row">
                        <h2 className="events-section-title">
                            {isEn ? 'Events year-round' : 'กิจกรรมตลอดทั้งปี'}
                        </h2>
                        <select
                            className="events-month-select"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {months.map(m => (
                                <option key={m.value} value={m.value}>
                                    {isEn ? m.labelEn : m.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Pills */}
                    <div className="events-categories">
                        {eventCategories.map(cat => (
                            <button
                                key={cat.id}
                                className={`events-pill ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <span className="events-pill-radio"></span>
                                {isEn ? cat.titleEn : cat.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Event Cards */}
            <div className="events-content">
                <div className="container">
                    {filteredEvents.length === 0 ? (
                        <div className="events-empty">
                            <div className="events-empty-icon">📅</div>
                            <p>{isEn ? 'No events found' : 'ไม่พบข้อมูล'}</p>
                        </div>
                    ) : (
                        <div className="events-grid">
                            {filteredEvents.map(event => (
                                <div key={event.id} className="event-card">
                                    <div className="event-card-image">
                                        <img src={event.image} alt={isEn ? event.titleEn : event.title} loading="lazy" />
                                        <div className="event-card-date">
                                            <span className="event-card-day">{event.day}</span>
                                            <span className="event-card-month">{isEn ? event.monthShortEn : event.monthShort}</span>
                                        </div>
                                    </div>
                                    <div className="event-card-body">
                                        <span className="event-card-daterange">
                                            📅 {isEn ? event.dateRangeEn : event.dateRange}
                                        </span>
                                        <h3 className="event-card-title">{isEn ? event.titleEn : event.title}</h3>
                                        <p className="event-card-location">
                                            📍 {isEn ? event.locationEn : event.location}
                                        </p>
                                        <p className="event-card-desc">{isEn ? event.descriptionEn : event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

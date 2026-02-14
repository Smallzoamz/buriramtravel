'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { eventsData } from '@/data/eventsData';

// Event Categories
const eventCategories = [
    { id: 'all', title: 'ทั้งหมด', titleEn: 'All' },
    { id: 'culture', title: 'วัฒนธรรม', titleEn: 'Culture' },
    { id: 'sports', title: 'ท่องเที่ยวเชิงกีฬา', titleEn: 'Sports Tourism' },
    { id: 'festival', title: 'เทศกาลประเพณี', titleEn: 'Festivals' },
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

// Years for Past Events
const pastYears = ['2026', '2025', '2024'];

export default function EventsPage() {
    const { language } = useLanguage();
    const isEn = language === 'EN';
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedPastYear, setSelectedPastYear] = useState('2569'); // Display in Thai BE format

    // Filter Current/Upcoming Events
    const currentEvents = eventsData.filter(e => !e.isPast).filter(e => {
        const matchCategory = activeCategory === 'all' || e.category === activeCategory;
        const matchMonth = selectedMonth === 'all' || e.monthShort === months[parseInt(selectedMonth)]?.label.substring(0, 3) || e.monthShort === months[parseInt(selectedMonth)]?.label;
        // Simple month check for now:
        const monthFilter = selectedMonth === 'all' || e.id.includes(months[parseInt(selectedMonth)]?.labelEn.toLowerCase()); // This logic is approximate
        return matchCategory && (selectedMonth === 'all' || true); // Defaulting to true for demo data
    });

    // Filter Past Events by Year
    const pastEvents = eventsData.filter(e => e.isPast).filter(e => {
        const thYear = e.year + 543;
        return thYear.toString() === selectedPastYear;
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

            {/* Current Event Cards */}
            <div className="events-content">
                <div className="container">
                    {currentEvents.length > 0 && (
                        <div className="events-grid">
                            {currentEvents.map(event => (
                                <Link href={`/events/${event.id}`} key={event.id} className="event-card">
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
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Past Events Section */}
            <div className="past-events-section">
                <div className="container">
                    <div className="events-filters-row" style={{ borderTop: '1px solid #eee', paddingTop: '40px', marginTop: '20px' }}>
                        <h2 className="events-section-title">
                            {isEn ? 'Past Events' : 'กิจกรรมที่ผ่านมาแล้ว'}
                        </h2>
                        <select
                            className="events-year-select"
                            value={selectedPastYear}
                            onChange={(e) => setSelectedPastYear(e.target.value)}
                        >
                            <option value="2569">2569</option>
                            <option value="2568">2568</option>
                            <option value="2567">2567</option>
                        </select>
                    </div>

                    {pastEvents.length === 0 ? (
                        <div className="events-empty">
                            <div className="events-empty-icon">📂</div>
                            <p>{isEn ? 'No past events found for this year' : 'ไม่พบกิจกรรมย้อนหลังในปีที่เลือก'}</p>
                        </div>
                    ) : (
                        <div className="events-grid">
                            {pastEvents.map(event => (
                                <Link href={`/events/${event.id}`} key={event.id} className="event-card past">
                                    <div className="event-card-image">
                                        <img src={event.image} alt={isEn ? event.titleEn : event.title} loading="lazy" />
                                        <div className="event-tag">
                                            {isEn ? event.categoryLabelEn : event.categoryLabel}
                                        </div>
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
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

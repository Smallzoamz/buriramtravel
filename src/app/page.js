'use client';
import { tourismCategories, tourismSpots, activityEvents, travelPlans, siteConfig } from '@/data/content';
import { showAlert } from '@/components/AlertModal';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="page-wrapper">

      {/* 1. Hero Section (Elegant Left-aligned) */}
      <section className="hero">
        <div className="hero-bg-image"></div>
        <div className="container">
          <div className="hero-content">
            <img src="/loe-buriram-w.png" alt="Loe Buriram" className="hero-logo-w" />

            <h1 className="hero-title">
              {t.hero_title_1} <br />
              {t.hero_title_2}
            </h1>

            <p className="hero-description">
              {t.hero_subtitle}
            </p>

            <div className="hero-search-wrapper">
              <span className="hero-search-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                type="text"
                className="hero-search-input"
                placeholder="บุรีรัมย์มีอะไรน่าเที่ยวบ้าง ?"
                onClick={() => showAlert({ title: t.coming_soon, message: t.loading_data, type: 'info' })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Attractions Grid (Title & All Link) */}
      <section id="attractions" className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <h2 className="section-title" style={{ margin: 0 }}>{t.popular_attractions}</h2>
            <a href="#" className="news-read-more" style={{ fontSize: '1rem' }}>{t.all_attractions} →</a>
          </div>

          <div className="tourism-grid">
            {tourismSpots.map((spot) => (
              <div key={spot.id} className="place-card" onClick={() => showAlert({ title: spot.title, message: t.loading_data, type: 'info' })}>
                <div className="place-card-image">
                  <img src={spot.image} alt={spot.title} />
                  <div className="place-card-badge">
                    {tourismCategories.find(c => c.id === spot.category)?.icon} {tourismCategories.find(c => c.id === spot.category)?.title}
                  </div>
                </div>
                <div className="place-card-overlay">
                  <h3>{spot.title}</h3>
                  <p>📍 {spot.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Categories Bar (Icons & Horizontal Scroll) */}
      <section style={{ background: '#f8fafc', padding: '60px 0' }}>
        <div className="container">
          <div className="category-pills">
            <button className="category-pill active">
              <span className="category-pill-icon">🔥</span> {t.view_all}
            </button>
            {tourismCategories.map(cat => (
              <button key={cat.id} className="category-pill">
                <span className="category-pill-icon">{cat.icon}</span> {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Activities / Events Section */}
      <section id="events" className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2 className="section-title" style={{ margin: 0, textAlign: 'left' }}>{t.interesting_activities}</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>{t.festivals_desc}</p>
            </div>
            <a href="#" className="news-read-more" style={{ fontSize: '1rem' }}>{t.all_activities} →</a>
          </div>

          <div className="activity-list">
            {activityEvents.map((event, i) => (
              <div key={i} className="activity-row">
                <div className="activity-date-box">
                  <span className="activity-date-day">{event.day}</span>
                  <span className="activity-date-month">{event.month}</span>
                </div>
                <div className="activity-content">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
                <div className="activity-image">
                  <img src={event.image} alt={event.title} />
                </div>
                <div>
                  <span style={{ fontSize: '1.5rem', color: 'var(--primary)', opacity: 0.3 }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Travel Plans Section (Dark Background) */}
      <section id="plans" className="travel-plan-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: 'white', marginBottom: '15px' }}>{t.travel_plans}</h2>
            <div className="gold-line" style={{ margin: '0 auto 20px' }}></div>
            <p style={{ opacity: 0.7 }}>{t.plans_desc}</p>
          </div>

          <div className="travel-plan-grid">
            {travelPlans.map(plan => (
              <div key={plan.id} className="plan-card">
                <div style={{ height: '220px', position: 'relative' }}>
                  <img src={plan.image} alt={plan.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--primary)', padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {plan.category}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '12px' }}>{plan.title}</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>{plan.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--electric-gold)' }}>📍 {plan.count} {t.locations_count}</span>
                    <button onClick={() => showAlert({ title: plan.title, message: t.coming_soon, type: 'info' })} style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>{t.open_plan} →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button className="btn-secondary" style={{ padding: '15px 40px' }}>{t.all_plans}</button>
          </div>
        </div>
      </section>

      {/* 6. Map Survey CTA (Split Layout) */}
      <section className="map-cta-split">
        <div className="container">
          <div className="map-cta-grid">
            {/* Left: Content */}
            <div className="map-cta-content">
              <img src="/loe-buriram.png" alt="Loe Buriram" className="map-cta-logo" />
              <h2 className="map-cta-title-bold">{t.map_cta_title}</h2>
              <p className="map-cta-desc">{t.map_cta_subtitle}</p>
              <div style={{ marginTop: '10px' }}>
                <button
                  className="btn-primary"
                  style={{
                    padding: '16px 32px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-dark)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: 'none'
                  }}
                  onClick={() => showAlert({ title: t.explore_map, message: t.loading_data, type: 'info' })}
                >
                  <span style={{ fontSize: '1.2rem' }}>🗺️</span>
                  {t.explore_map}
                </button>
              </div>
            </div>

            {/* Right: Collage */}
            <div className="collage-grid">
              <div className="collage-item">
                <img src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=800&fit=crop" alt="Collage 1" />
              </div>
              <div className="collage-item">
                <img src="https://images.unsplash.com/photo-1596701062351-8c2c14d1fcd1?w=400&h=800&fit=crop" alt="Collage 2" />
              </div>
              <div className="collage-item">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=800&fit=crop" alt="Collage 3" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

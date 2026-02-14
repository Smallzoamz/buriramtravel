'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { buriramDistricts } from '@/data/buriramDistricts';
import { useLanguage } from '@/context/LanguageContext';
import 'leaflet/dist/leaflet.css';

// Buriram center coordinates
const BURIRAM_CENTER = [14.95, 103.0];
const BURIRAM_ZOOM = 9;

// Custom hook to fit map to GeoJSON bounds
function FitBounds({ data }) {
    const map = useMap();
    useEffect(() => {
        if (data && data.features.length > 0) {
            const L = require('leaflet');
            const geoJsonLayer = L.geoJSON(data);
            const bounds = geoJsonLayer.getBounds();
            map.fitBounds(bounds, { padding: [30, 30] });
        }
    }, [data, map]);
    return null;
}

export default function MapView() {
    const { language } = useLanguage();
    const [hoveredDistrict, setHoveredDistrict] = useState(null);

    // Style for each district polygon
    const districtStyle = (feature) => ({
        fillColor: feature.properties.color,
        weight: 2,
        opacity: 1,
        color: '#ffffff',
        dashArray: '',
        fillOpacity: 0.55
    });

    // Highlight style on hover — subtle only
    const highlightStyle = (feature) => ({
        ...districtStyle(feature),
        fillOpacity: 0.75
    });

    // Event handlers for each district feature
    const onEachFeature = (feature, layer) => {
        const name = language === 'EN'
            ? feature.properties.name_en
            : feature.properties.name_th;

        // Tooltip
        layer.bindTooltip(name, {
            permanent: false,
            direction: 'center',
            className: 'district-tooltip'
        });

        // Hover events
        layer.on({
            mouseover: (e) => {
                e.target.setStyle(highlightStyle(feature));
                setHoveredDistrict(feature.properties);
            },
            mouseout: (e) => {
                e.target.setStyle(districtStyle(feature));
                setHoveredDistrict(null);
            }
        });
    };

    return (
        <div className="map-wrapper">
            {/* Info Panel */}
            <div className="map-info-panel">
                {hoveredDistrict ? (
                    <>
                        <div className="map-info-color" style={{ background: hoveredDistrict.color }}></div>
                        <div>
                            <h3 className="map-info-name">{hoveredDistrict.name_th}</h3>
                            <p className="map-info-name-en">{hoveredDistrict.name_en}</p>
                        </div>
                    </>
                ) : (
                    <p className="map-info-hint">
                        {language === 'EN' ? 'Hover over a district to see details' :
                            language === 'ZH' ? '将鼠标悬停在区域上查看详情' :
                                language === 'JP' ? '地区にカーソルを合わせると詳細が表示されます' :
                                    'เลื่อนเมาส์ไปที่อำเภอเพื่อดูรายละเอียด'}
                    </p>
                )}
            </div>

            {/* Legend */}
            <div className="map-legend">
                <h4 className="map-legend-title">
                    {language === 'EN' ? 'Districts' :
                        language === 'ZH' ? '各区' :
                            language === 'JP' ? '地区' : 'อำเภอ'}
                </h4>
                <div className="map-legend-list">
                    {buriramDistricts.features.map((f) => (
                        <div key={f.properties.id} className="map-legend-item">
                            <span className="map-legend-color" style={{ background: f.properties.color }}></span>
                            <span className="map-legend-label">
                                {language === 'EN' ? f.properties.name_en : f.properties.name_th}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map */}
            <MapContainer
                center={BURIRAM_CENTER}
                zoom={BURIRAM_ZOOM}
                className="map-container"
                zoomControl={true}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <GeoJSON
                    data={buriramDistricts}
                    style={districtStyle}
                    onEachFeature={onEachFeature}
                />
                <FitBounds data={buriramDistricts} />
            </MapContainer>
        </div>
    );
}

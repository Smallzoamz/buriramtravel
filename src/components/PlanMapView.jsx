'use client';

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

// Numbered marker icon — normal
function createNumberedIcon(number, isActive) {
    const activeClass = isActive ? 'active' : '';
    return L.divIcon({
        className: `plan-map-marker ${activeClass}`,
        html: `<div class="plan-marker-inner ${activeClass}">${number}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        tooltipAnchor: [0, -20],
    });
}

// Fit bounds component
function FitBounds({ spots }) {
    const map = useMap();

    useEffect(() => {
        if (spots.length > 0) {
            const bounds = L.latLngBounds(spots.map(s => [s.lat, s.lng]));
            map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
        }
    }, [spots, map]);

    return null;
}

// Individual marker that re-renders on hover
function SpotMarker({ spot, index, isEn, isActive }) {
    const markerRef = useRef(null);

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.setIcon(createNumberedIcon(index + 1, isActive));
        }
    }, [isActive, index]);

    return (
        <Marker
            ref={markerRef}
            position={[spot.lat, spot.lng]}
            icon={createNumberedIcon(index + 1, isActive)}
        >
            <Tooltip direction="top" offset={[0, -4]} permanent>
                <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    {isEn ? `Stop ${index + 1}` : `จุดที่ ${index + 1}`}
                </span>
            </Tooltip>
        </Marker>
    );
}

export default function PlanMapView({ spots, isEn, hoveredSpot }) {
    if (!spots || spots.length === 0) return null;

    const center = [spots[0].lat, spots[0].lng];

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-lg)' }}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | MapLibre'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <FitBounds spots={spots} />
            {spots.map((spot, index) => (
                <SpotMarker
                    key={index}
                    spot={spot}
                    index={index}
                    isEn={isEn}
                    isActive={hoveredSpot === index}
                />
            ))}
        </MapContainer>
    );
}

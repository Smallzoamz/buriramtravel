// Extract Buriram districts from geoBoundaries THA-ADM2
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('f:/buriramtravel/tmp_thailand_adm2.geojson', 'utf8'));

// Buriram bounding box (approximate)
const BOUNDS = { minLat: 14.2, maxLat: 15.8, minLon: 102.3, maxLon: 103.5 };

// Known Buriram district names (English)
const buriramNames = [
    'Mueang Buri Ram', 'Khu Mueang', 'Krasang', 'Nang Rong', 'Nong Ki',
    'Lahan Sai', 'Prakhon Chai', 'Ban Kruat', 'Phutthaisong', 'Lam Plai Mat',
    'Satuek', 'Pakham', 'Na Pho', 'Nong Hong', 'Phlapphla Chai', 'Huai Rat',
    'Non Suwan', 'Chamni', 'Ban Mai Chaiyaphot', 'Non Din Daeng',
    'Ban Dan', 'Khaen Dong', 'Chaloem Phra Kiat'
];

function getCentroid(geometry) {
    let coords = [];
    if (geometry.type === 'Polygon') {
        coords = geometry.coordinates[0];
    } else if (geometry.type === 'MultiPolygon') {
        coords = geometry.coordinates[0][0];
    }
    const sum = coords.reduce((acc, c) => ({ lon: acc.lon + c[0], lat: acc.lat + c[1] }), { lon: 0, lat: 0 });
    return { lon: sum.lon / coords.length, lat: sum.lat / coords.length };
}

function isInBuriram(centroid) {
    return centroid.lat >= BOUNDS.minLat && centroid.lat <= BOUNDS.maxLat &&
        centroid.lon >= BOUNDS.minLon && centroid.lon <= BOUNDS.maxLon;
}

// Thai name mapping
const thaiNames = {
    'Mueang Buri Ram': 'เมืองบุรีรัมย์',
    'Khu Mueang': 'คูเมือง',
    'Krasang': 'กระสัง',
    'Nang Rong': 'นางรอง',
    'Nong Ki': 'หนองกี่',
    'Lahan Sai': 'ละหานทราย',
    'Prakhon Chai': 'ประโคนชัย',
    'Ban Kruat': 'บ้านกรวด',
    'Phutthaisong': 'พุทไธสง',
    'Lam Plai Mat': 'ลำปลายมาศ',
    'Satuek': 'สตึก',
    'Pakham': 'ปะคำ',
    'Na Pho': 'นาโพธิ์',
    'Nong Hong': 'หนองหงส์',
    'Phlapphla Chai': 'พลับพลาชัย',
    'Huai Rat': 'ห้วยราช',
    'Non Suwan': 'โนนสุวรรณ',
    'Chamni': 'ชำนิ',
    'Ban Mai Chaiyaphot': 'บ้านใหม่ไชยพจน์',
    'Non Din Daeng': 'โนนดินแดง',
    'Ban Dan': 'บ้านด่าน',
    'Khaen Dong': 'แคนดง',
    'Chaloem Phra Kiat': 'เฉลิมพระเกียรติ'
};

const colors = [
    '#1A3373', '#29409D', '#1B4F72', '#2C5F8A', '#1F618D',
    '#2471A3', '#2980B9', '#2E86C1', '#3498DB', '#3A7BC8',
    '#3B5EBF', '#4A7DD4', '#4B8BBE', '#5499C7', '#5B9AE8',
    '#5DADE2', '#6FB3F2', '#7EC8E3', '#85C1E9', '#AED6F1',
    '#48C9B0', '#76D7C4', '#1ABC9C'
];

// Filter: name match + bounding box
const buriramFeatures = data.features.filter(f => {
    const name = f.properties.shapeName;
    if (!buriramNames.some(n => name === n)) return false;
    const centroid = getCentroid(f.geometry);
    return isInBuriram(centroid);
});

console.log('Filtered Buriram districts:', buriramFeatures.length);
buriramFeatures.forEach((f, i) => {
    const c = getCentroid(f.geometry);
    console.log(`  ${i + 1}. ${f.properties.shapeName} (${c.lat.toFixed(3)}, ${c.lon.toFixed(3)})`);
});

// Add Thai names and colors
const enriched = {
    type: 'FeatureCollection',
    features: buriramFeatures.map((f, i) => ({
        type: 'Feature',
        properties: {
            name_en: f.properties.shapeName,
            name_th: thaiNames[f.properties.shapeName] || f.properties.shapeName,
            color: colors[i % colors.length],
            id: i + 1
        },
        geometry: f.geometry
    }))
};

// Write as JS module
const jsContent = `// Buriram Province District Boundaries (GeoJSON)
// Source: geoBoundaries THA-ADM2 (CC BY 3.0 IGO)
export const buriramDistricts = ${JSON.stringify(enriched)};
`;

fs.writeFileSync('f:/buriramtravel/src/data/buriramDistricts.js', jsContent);
console.log('\n✅ Saved to src/data/buriramDistricts.js');

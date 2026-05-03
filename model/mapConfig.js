/**
 * MODEL — mapConfig.js
 * Configurações e dados estáticos do módulo de mapa.
 */

const MAP_CONFIG = {
  defaultLat: -20.3297,
  defaultLon: -40.2922,
  defaultZoom: 14,
  searchRadiusDeg: 0.05, // ~5 km

  tileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  tileAttribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',

  overpassUrl: "https://overpass-api.de/api/interpreter",
  nominatimSearchUrl: "https://nominatim.openstreetmap.org/search",
  nominatimReverseUrl: "https://nominatim.openstreetmap.org/reverse",

  markerColors: {
    hospital: { bg: "#C0392B", border: "#922B21" },
    psychiatrist: { bg: "#6C3483", border: "#4A235A" },
    psychologist: { bg: "#B8924A", border: "#7A5C2E" },
    clinic: { bg: "#1A6B4A", border: "#0F4A33" },
    default: { bg: "#B8924A", border: "#7A5C2E" },
  },

  typeLabels: {
    hospital: "🏥 Hospital",
    psychiatrist: "🧠 Psiquiatra",
    psychologist: "💬 Psicólogo",
    clinic: "🏨 Clínica",
  },

  legendItems: [
    { color: "#C0392B", label: "Hospital" },
    { color: "#6C3483", label: "Psiquiatra" },
    { color: "#B8924A", label: "Psicólogo" },
    { color: "#1A6B4A", label: "Clínica" },
    { color: "#2980B9", label: "Você" },
  ],

  freeResources: [
    { name: "CVV — Centro de Valorização da Vida", contact: "188 (24h)" },
    { name: "CAPS — Centro de Atenção Psicossocial", contact: "Via SUS" },
    { name: "UBS com saúde mental", contact: "Busque no mapa" },
  ],
};

/**
 * CONTROLLER — mapa.js
 * Toda a lógica do mapa: inicialização Leaflet, geocodificação,
 * Overpass API, geolocalização e renderização de marcadores.
 */

const MapController = (() => {

  let map = null;
  let markersLayer = null;

  /* ── Helpers de UI ── */

  function setStatus(msg) {
    const el = document.getElementById("map-status");
    if (!el) return;
    if (msg) { el.textContent = msg; el.style.display = "block"; }
    else { el.style.display = "none"; }
  }

  function setMapOpacity(val) {
    const el = document.getElementById("map");
    if (el) el.style.opacity = val;
  }

  /* ── Leaflet ── */

  function initMap(lat, lon) {
    if (map) { map.setView([lat, lon], MAP_CONFIG.defaultZoom); return; }

    map = L.map("map").setView([lat, lon], MAP_CONFIG.defaultZoom);
    L.tileLayer(MAP_CONFIG.tileLayer, {
      attribution: MAP_CONFIG.tileAttribution,
      maxZoom: 19,
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);

    // Corrige tiles cinzas quando o container não tinha altura definida no load
    setTimeout(() => map.invalidateSize(), 200);
  }

  function buildIcon(type) {
    const c = MAP_CONFIG.markerColors[type] || MAP_CONFIG.markerColors.default;
    return L.divIcon({
      className: "",
      html: `<div style="
        width:13px;height:13px;
        background:${c.bg};
        border:2px solid ${c.border};
        border-radius:50%;
        box-shadow:0 1px 4px rgba(0,0,0,0.35);
      "></div>`,
      iconSize: [13, 13],
      iconAnchor: [6, 6],
    });
  }

  /* ── Overpass ── */

  async function fetchOverpass(lat, lon) {
    const d = MAP_CONFIG.searchRadiusDeg;
    const bbox = `${lat - d},${lon - d},${lat + d},${lon + d}`;
    const q = `
      [out:json][timeout:25];
      (
        node["healthcare"="psychologist"](${bbox});
        node["healthcare"="psychiatrist"](${bbox});
        node["healthcare"="counselor"](${bbox});
        node["amenity"="clinic"]["healthcare"](${bbox});
        node["amenity"="hospital"](${bbox});
        node["healthcare"="hospital"](${bbox});
        node["name"~"CAPS|psico|mental|saúde mental|psiquiatri|hospital",i](${bbox});
        way["healthcare"="psychologist"](${bbox});
        way["healthcare"="psychiatrist"](${bbox});
        way["amenity"="clinic"](${bbox});
        way["amenity"="hospital"](${bbox});
        way["healthcare"="hospital"](${bbox});
        way["name"~"CAPS|psico|mental|saúde mental|psiquiatri|hospital",i](${bbox});
        relation["amenity"="hospital"](${bbox});
      );
      out center;
    `;
    const res = await fetch(MAP_CONFIG.overpassUrl, { method: "POST", body: q });
    return res.json();
  }

  function placeMarkers(data, centerLat, centerLon, centerLabel) {
    markersLayer.clearLayers();

    L.marker([centerLat, centerLon])
      .addTo(markersLayer)
      .bindPopup(`<b>📍 ${centerLabel}</b>`);

    let count = 0;
    data.elements.forEach((el) => {
      const lat = el.lat ?? el.center?.lat;
      const lon = el.lon ?? el.center?.lon;
      if (!lat || !lon) return;

      const name = el.tags?.name ?? el.tags?.["name:pt"] ?? "Serviço de Saúde Mental";
      const type = el.tags?.healthcare ?? el.tags?.amenity ?? "default";
      const label = MAP_CONFIG.typeLabels[type] ?? "🩺 Serviço de Saúde";
      const addr = [el.tags?.["addr:street"], el.tags?.["addr:housenumber"], el.tags?.["addr:suburb"]]
        .filter(Boolean).join(", ") || "Endereço não disponível";
      const phone = el.tags?.phone ?? el.tags?.["contact:phone"] ?? "";

      const popup = `<b>${name}</b><br>
        <span style="color:#8A7060;font-size:11px">${label}</span><br>
        📍 ${addr}${phone ? `<br>📞 ${phone}` : ""}`;

      L.marker([lat, lon], { icon: buildIcon(type) })
        .addTo(markersLayer)
        .bindPopup(popup);
      count++;
    });

    return count;
  }

  /* ── Geocodificação ── */

  async function geocode(query) {
    const url = `${MAP_CONFIG.nominatimSearchUrl}?q=${encodeURIComponent(query)}&format=json&limit=1`;
    const res = await fetch(url, { headers: { "Accept-Language": "pt-BR" } });
    const data = await res.json();
    if (!data.length) return null;
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  }

  async function reverseGeocode(lat, lon) {
    const url = `${MAP_CONFIG.nominatimReverseUrl}?lat=${lat}&lon=${lon}&format=json`;
    const res = await fetch(url, { headers: { "Accept-Language": "pt-BR" } });
    const data = await res.json();
    return data.address?.city ?? data.address?.town ?? data.address?.suburb ?? "Sua localização";
  }

  /* ── Ações públicas ── */

  async function searchMap() {
    const input = document.getElementById("map-input");
    const query = input?.value.trim();
    if (!query) { alert("Digite uma cidade ou bairro para buscar."); return; }

    setMapOpacity("0.5");
    setStatus("🔍 Buscando localização...");

    try {
      const coords = await geocode(query);
      if (!coords) {
        alert("Local não encontrado. Tente outro endereço.");
        setMapOpacity("1"); setStatus(null); return;
      }

      initMap(coords.lat, coords.lon);
      setStatus("🔍 Buscando serviços de saúde mental...");

      const data = await fetchOverpass(coords.lat, coords.lon);
      const count = placeMarkers(data, coords.lat, coords.lon, query);
      map.setView([coords.lat, coords.lon], MAP_CONFIG.defaultZoom);

      setStatus(
        count > 0
          ? `✅ ${count} local(is) encontrado(s) — clique nos marcadores para detalhes.`
          : "⚠️ Nenhum local encontrado nessa área. Tente uma cidade maior ou busque por CAPS."
      );
    } catch (e) {
      console.error(e);
      alert("Erro ao buscar no mapa. Verifique sua conexão.");
      setStatus(null);
    } finally {
      setMapOpacity("1");
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      initMap(MAP_CONFIG.defaultLat, MAP_CONFIG.defaultLon);
      setStatus("ℹ️ Geolocalização não suportada. Use a busca manual acima.");
      return;
    }

    const btn = document.getElementById("btn-locate");
    if (btn) btn.disabled = true;
    setStatus("📡 Obtendo sua localização...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;

        // Inicia o mapa com as coordenadas reais — nunca antes disso
        initMap(lat, lon);

        // Reverse geocode para preencher campo de texto
        try {
          const city = await reverseGeocode(lat, lon);
          const input = document.getElementById("map-input");
          if (input) input.value = city;
        } catch (_) {
          const input = document.getElementById("map-input");
          if (input) input.value = "Minha localização";
        }

        setMapOpacity("0.5");
        setStatus("🔍 Buscando serviços de saúde mental próximos...");

        try {
          const data = await fetchOverpass(lat, lon);
          const count = placeMarkers(data, lat, lon, "Você está aqui");

          // Marcador especial "Você está aqui"
          L.circleMarker([lat, lon], {
            radius: 8, color: "#7A5C2E",
            fillColor: "#E8C87A", fillOpacity: 1, weight: 2,
          }).addTo(markersLayer).bindPopup("<b>📍 Você está aqui</b>").openPopup();

          map.setView([lat, lon], MAP_CONFIG.defaultZoom);
          setStatus(
            count > 0
              ? `✅ ${count} local(is) encontrado(s) perto de você — clique para detalhes.`
              : "⚠️ Nenhum local encontrado próximo. Tente buscar por nome de cidade."
          );
        } catch (_) {
          setStatus("⚠️ Erro ao buscar locais. Tente a busca manual.");
        }

        setMapOpacity("1");
        if (btn) btn.disabled = false;
      },
      (err) => {
        // Qualquer falha: inicia mapa no ponto padrão
        if (btn) btn.disabled = false;
        initMap(MAP_CONFIG.defaultLat, MAP_CONFIG.defaultLon);

        if (err.code === err.PERMISSION_DENIED) {
          setStatus("ℹ️ Localização não autorizada. Use a busca manual acima.");
        } else {
          setStatus("⚠️ Não foi possível obter sua localização. Use a busca manual.");
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  /* ── Renderiza legenda e recursos a partir do Model ── */

  function renderLegend() {
    const el = document.getElementById("map-legend");
    if (!el) return;
    el.innerHTML = MAP_CONFIG.legendItems
      .map(item => `<span><i style="background:${item.color}"></i>${item.label}</span>`)
      .join("");
  }

  function renderResources() {
    const el = document.getElementById("free-resources");
    if (!el) return;
    el.innerHTML = MAP_CONFIG.freeResources
      .map(r => `<li><span>${r.name}</span><strong>${r.contact}</strong></li>`)
      .join("");
  }

  /* ── Init ── */

  function init() {
    renderLegend();
    renderResources();

    document.getElementById("btn-search")
      ?.addEventListener("click", searchMap);

    document.getElementById("map-input")
      ?.addEventListener("keydown", (e) => { if (e.key === "Enter") searchMap(); });

    document.getElementById("btn-locate")
      ?.addEventListener("click", useMyLocation);

    // Garante que o container do mapa tem altura antes de qualquer init
    const mapDiv = document.getElementById("map");
    if (mapDiv) mapDiv.style.minHeight = "360px";

    // Tenta geolocalização automaticamente.
    // Se negada/falhar, cai no fallback e inicia o mapa em Vila Velha.
    useMyLocation();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", MapController.init);

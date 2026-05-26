---
title: "JavaScript para GIS"
description: "Desarrollo de aplicaciones GIS en el navegador con JavaScript"
pubDate: 2026-05-27
tags: ["ARMILLARY", "GIS", "Geospatial", "Data Science", "JavaScript"]
---

## Por qué JavaScript es clave para GIS web
El navegador es la plataforma de distribución más accesible. JavaScript permite renderizar mapas interactivos, consumir servicios OGC y crear visualizaciones personalizadas sin instalar software adicional.

## Bibliotecas más usadas
| Biblioteca | Tipo | Enlace |
|------------|------|--------|
| **Leaflet** | Mapeo 2D ligera | https://leafletjs.com |
| **OpenLayers** | Mapeo avanzado, soporte 3D | https://openlayers.org |
| **Mapbox GL JS** | Renderizado WebGL, vectores | https://docs.mapbox.com/mapbox-gl-js |
| **CesiumJS** | Visualización 3D de globos terráqueos | https://cesium.com/platform/cesiumjs |
| **Turf.js** | Análisis espacial en el cliente | https://turfjs.org |

## Ejemplo rápido con Leaflet
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
  <style>#map { height: 100vh; }</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script>
  const map = L.map('map').setView([40.7128, -74.0060], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  // Añadir punto de ejemplo
  L.marker([40.7128, -74.0060]).addTo(map)
    .bindPopup('Nueva York');
</script>
</body>
</html>
```

## Consumo de servicios OGC
JavaScript se conecta fácilmente a **WMS**, **WFS** y **WMTS** mediante peticiones HTTP. Con `fetch` puedes solicitar un `GeoJSON` de un `WFS` y procesarlo con **Turf.js** para análisis on‑the‑fly.
```js
fetch('https://demo.geo-solutions.it/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=topp:states&outputFormat=application/json')
  .then(r => r.json())
  .then(data => {
    const features = data.features;
    // Calcular centroide de cada estado
    const centroids = features.map(f => turf.centroid(f));
    L.geoJSON({type: 'FeatureCollection', features: centroids}).addTo(map);
  });
```

## Buenas prácticas
- **Minimiza la carga:** Usa tiles vectoriales (`.pbf`) en vez de raster cuando sea posible.
- **Gestiona el CRS:** Leaflet trabaja en EPSG:3857; si tu capa está en otro CRS, reproyecta en el servidor.
- **Debounce de eventos:** para interacciones intensas (zoom, pan) usa `requestAnimationFrame` o `throttle`.
- **Seguridad:** Evita inyección de datos en URLs; valida siempre los parámetros.

## Bibliografía
1. **Leaflet – Documentation** – https://leafletjs.com/reference.html
2. **OpenLayers – API Overview** – https://openlayers.org/en/latest/doc/
3. **Mapbox GL JS – API Docs** – https://docs.mapbox.com/mapbox-gl-js/api/
4. **Turf.js – Spatial analysis** – https://turfjs.org/
5. *Programming the World Wide Web* – O'Reilly (capítulo de APIs geoespaciales).

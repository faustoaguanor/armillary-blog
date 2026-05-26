---
title: "Qué es GeoServer"
description: "Servidor de mapas OGC de código abierto y sus principales componentes"
pubDate: 2026-05-30
tags: ["ARMILLARY", "GIS", "GIS Servers", "GeoServer"]
---

## Visión general
**GeoServer** es una plataforma Java que publica datos geoespaciales a través de estándares OGC como **WMS**, **WFS**, **WCS**, **WMTS** y **WFS‑3 (OGC API – Features)**. Permite a usuarios y aplicaciones consumir capas raster/vectoriales sin necesidad de conocer la infraestructura subyacente.

## Arquitectura básica
- **Data Store** – Conexiones a fuentes de datos (PostGIS, Shapefile, GeoTIFF, Oracle Spatial, etc.).
- **Layer** – Representación lógica de una tabla o una vista; puede ser publicada como diferentes servicios.
- **Style (SLD)** – Definición de simbología basada en XML *Styled Layer Descriptor*.
- **Workspace** – Agrupación de capas y estilos que comparten un prefijo de URL.

## Servicios principales
| Servicio | Protocolo | Uso típico |
|----------|----------|-----------|
| **WMS** (Web Map Service) | HTTP GET/POST | Renderizar mapas raster como imágenes PNG/JPEG. |
| **WFS** (Web Feature Service) | HTTP GET/POST | Descargar datos vectoriales en GML, GeoJSON, Shapefile. |
| **WCS** (Web Coverage Service) | HTTP GET/POST | Acceder a datos raster (ej. DEM, satélite) en su formato nativo. |
| **WMTS** (Web Map Tile Service) | HTTP GET | Tiles pre‑generados para clientes tipo Leaflet/OpenLayers. |
| **WFS‑3 / OGC API – Features** | RESTful JSON | API moderna, facilita integración con SPA y micro‑servicios. |

## Publicar una capa sencilla (PostGIS)
1. **Instala GeoServer** – `wget https://sourceforge.net/projects/geoserver/files/GeoServer/2.24.2/geoserver-2.24.2-bin.zip` y descomprime.
2. **Inicia** – `./bin/startup.sh` (requiere Java 11+).
3. **Crea un Workspace** llamado `armillary`.
4. **Añade un Data Store** → *PostGIS* → configuración de conexión (`host`, `port`, `database`, `user`, `passwd`).
5. **Crea una Layer** → elige la tabla `parques` (del ejemplo PostGIS).
6. **Define un SLD** (ejemplo de polígonos verdes):
```xml
<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld">
  <NamedLayer>
    <Name>ParquesVerdes</Name>
    <UserStyle>
      <Title>Polígonos verdes</Title>
      <FeatureTypeStyle>
        <Rule>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#00ff00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#006600</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
```
7. **Prueba** la capa vía URL: `http://localhost:8080/geoserver/armillary/wms?service=WMS&request=GetMap&layers=armillary:parques&styles=&bbox=-74,40,-73,41&width=800&height=600&srs=EPSG:4326&format=image/png`.

## Buenas prácticas de operación
- **Separar entornos**: Usa workspaces `dev`, `stage`, `prod` para evitar colisiones.
- **Caché**: Habilita *GeoWebCache* para tiles WMTS y reduce carga en capas complejas.
- **Seguridad**: Configura autenticación básica o LDAP; limita la exposición de capas sensibles.
- **Monitoreo**: Usa JMX o Prometheus exporter para observar uso de CPU y tiempos de respuesta.

## Bibliografía
1. **GeoServer User Manual (2.24.x)** – https://docs.geoserver.org/stable/en/user/
2. **OGC Standards Overview** – https://www.ogc.org/standards
3. *Learning GeoServer* – Gianni Cione (2021). ISBN: 9781784392378.
4. **SLD Specification** – https://www.ogc.org/standards/sld
5. **GeoServer & PostGIS Integration Guide** – https://docs.geoserver.org/stable/en/user/data/postgis.html

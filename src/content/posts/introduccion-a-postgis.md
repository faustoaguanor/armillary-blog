---
title: "Introducción a PostGIS"
description: "Primeros pasos con la extensión espacial de PostgreSQL"
pubDate: 2026-05-29
tags: ["Geospatial DB"]
---

## ¿Qué es PostGIS?
**PostGIS** es una extensión de **PostgreSQL** que añade tipos de datos y funciones compatibles con el estándar *Simple Features* de la OGC. Con ella, una base de datos relacional pasa a gestionar geometrías, rásters y topología.

## Instalación rápida (Linux)
```bash
# PostgreSQL + PostGIS (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install postgresql postgis postgresql-15-postgis-3

# Crear base y habilitar extensión
sudo -u postgres createdb gisdb
sudo -u postgres psql -d gisdb -c "CREATE EXTENSION postgis;"
```
> En macOS, usa Homebrew: `brew install postgis`.

## Tipos de datos básicos
| Tipo | Descripción |
|------|--------------|
| `GEOMETRY` | Cualquier geometría (punto, línea, polígono). |
| `GEOGRAPHY` | Coordenadas geodésicas en WGS84, útil para cálculos de distancia grande escala. |
| `RASTER` | Almacena imágenes raster con metadatos espaciales. |

## Primeras consultas
```sql
-- Crear tabla con geometría
CREATE TABLE parques (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  geom GEOMETRY(POLYGON, 4326)
);

-- Insertar un polígono (parque ficticio)
INSERT INTO parques (nombre, geom) VALUES (
  'Parque Central',
  ST_GeomFromText('POLYGON((-74.0 40.7, -74.0 40.8, -73.9 40.8, -73.9 40.7, -74.0 40.7))', 4326)
);

-- Seleccionar parques que intersectan un punto de interés
SELECT nombre FROM parques
WHERE ST_Intersects(
  geom,
  ST_SetSRID(ST_MakePoint(-73.95, 40.75), 4326)
);
```

## Índices espaciales
Crear un índice GiST acelera las consultas de intersección:
```sql
CREATE INDEX idx_parques_geom ON parques USING GIST (geom);
```
Después de crear el índice, **EXPLAIN ANALYZE** mostrará un plan de búsqueda mucho más eficiente.

## Integración con QGIS
1. En QGIS, añade una nueva conexión *PostGIS* (Database → PostgreSQL → New Connection).  
2. Configura host, puerto, base de datos `gisdb`, y usuario/postgres.  
3. Importa la tabla `parques`; QGIS reconocerá automáticamente la columna `geom`.

## Buenas prácticas
- **SRID consistente:** Mantén todas tus geometrías en el mismo SRID (ej. 4326 o 3857) para evitar reproyecciones costosas en tiempo de consulta.
- **Mantén estadísticas actualizadas:** `ANALYZE parques;` ayuda al planificador.
- **Evita `ST_AsText` en producción:** Convertir a WKT es costoso; usa `ST_AsBinary` o `ST_AsGeoJSON` según sea necesario.

## Bibliografía
1. **PostGIS Official Documentation** – https://postgis.net/docs/
2. **PostGIS in Action**, 2nd ed., Regina O. Obe et al. (2020). ISBN: 9781635577989.
3. **PostgreSQL Manual – Spatial Extensions** – https://www.postgresql.org/docs/current/postgis.html
4. **QGIS & PostGIS Integration Guide** – https://docs.qgis.org/latest/en/docs/user_manual/working_with_vector/postgis.html
5. *Pro PostgreSQL* – Hans-Jürgen Schönig (capítulo de extensiones).

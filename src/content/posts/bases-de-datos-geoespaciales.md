---
title: "Bases de Datos Geoespaciales"
description: "Conceptos y arquitectura de bases de datos que soportan información espacial"
pubDate: 2026-05-28
tags: ["Geospatial Analysis", "Data Science", "Geospatial Databases"]
---

## ¿Qué es una base de datos geoespacial?
Una **Base de Datos Geoespacial (Spatial DB)** almacena geometrías (puntos, líneas, polígonos) y atributos asociados, permitiendo consultas basadas en relaciones espaciales (intersección, contención, proximidad). Estas bases siguen el estándar **Simple Features** de la OGC, que define tipos de datos y funciones.

## Arquitectura y componentes clave
1. **Tipo de dato geométrico** – `POINT`, `LINESTRING`, `POLYGON`, `MULTIPOINT`, etc.
2. **Índices espaciales** – Generalmente **R‑Tree** o **GiST**, que aceleran operaciones como `ST_Intersects`.
3. **Funciones espaciales** – Operaciones topológicas (`ST_Touches`, `ST_Within`), de distancia (`ST_Distance`), y de análisis (`ST_Union`).
4. **Sistemas de referencia (CRS)** – Cada geometría tiene asociado un SRID que indica su proyección.

## Implementaciones populares
| Motor | Licencia | Comentario |
|-------|----------|------------|
| **PostGIS** (extensión de PostgreSQL) | Open‑source (GPL) | Amplio conjunto de funciones, alta integración con QGIS y GDAL. |
| **SpatiaLite** (SQLite + extensión) | Public domain | Ideal para aplicaciones locales y móviles. |
| **Oracle Spatial** | Comercial | Soporta topología avanzada y gran escala empresarial. |
| **SQL Server Spatial** | Comercial | Integrado en Microsoft ecosistema, buen soporte .NET. |

## Caso de uso típico: análisis de superposición
```sql
SELECT a.id, b.id
FROM parcels AS a
JOIN zonas_protegidas AS b
  ON ST_Intersects(a.geom, b.geom);
```
Esta consulta devuelve todas las parcelas que intersectan con áreas protegidas, usando el índice GiST para acelerar la búsqueda.

## Buenas prácticas de modelado
- **Normaliza atributos** y guarda geometrías en una tabla separada para evitar duplicación.
- **Usa SRID consistente**; si trabajas con datos internacionales, emplea EPSG:4326 (WGS84) y reproyecta a EPSG:3857 para visualización web.
- **Mantén estadísticas** actualizadas (`ANALYZE`) para que el optimizador de consultas utilice los índices de manera óptima.

## Bibliografía
1. **OGC Simple Features Specification** – https://www.ogc.org/standard/sfs/
2. **PostGIS in Action, 2nd Edition** – Regina Obe, et al. (2020). ISBN: 9781635577989.
3. **SpatiaLite – Official Manual** – https://www.gaia-gis.it/fossil/libspatialite/wiki?name=Manual
4. **Spatial Databases – An Overview** – *IEEE Transactions on Knowledge and Data Engineering*, 2022.
5. **SQL Server Spatial Documentation** – https://docs.microsoft.com/sql/relational-databases/spatial/spatial-data-sql-server

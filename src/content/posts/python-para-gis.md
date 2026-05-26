---
title: "Python para GIS"
description: "Uso de Python en análisis y procesamiento geoespacial"
pubDate: 2026-05-26
tags: ["Geospatial Analysis", "Data Science", "GIS Programming"]
---

## Introducción
Python se ha consolidado como el lenguaje de facto para la ciencia de datos y, por extensión, para el análisis geoespacial. Su ecosistema de bibliotecas permite leer, transformar, analizar y visualizar datos espaciales con tan solo unas pocas líneas de código.

## Principales librerías
| Librería | Propósito | Enlace |
|----------|-----------|--------|
| **GDAL/OGR** | Lectura/escritura de formatos raster y vectoriales | https://gdal.org |
| **Rasterio** | Manipulación de rásters con API pythonica | https://rasterio.readthedocs.io |
| **GeoPandas** | Extiende pandas para datos geográficos | https://geopandas.org |
| **Shapely** | Operaciones geométricas (intersección, buffer) | https://shapely.readthedocs.io |
| **Fiona** | I/O vectorial ligera, basada en OGR | https://fiona.readthedocs.io |
| **PyProj** | Transformaciones de sistemas de referencia | https://pyproj4.github.io/pyproj/stable |

## Flujo de trabajo típico
```python
import geopandas as gpd
from shapely.geometry import Point

# 1. Cargar shapefile
gdf = gpd.read_file('data/municipios.shp')

# 2. Reproyectar a EPSG:3857
gdf = gdf.to_crs(epsg=3857)

# 3. Crear punto de referencia
pt = Point(-74.006, 40.7128)  # NYC (lon, lat)

# 4. Seleccionar municipios que contienen el punto
selected = gdf[gdf.contains(pt)]

# 5. Exportar a GeoJSON
selected.to_file('output/selection.geojson', driver='GeoJSON')
```

## Buenas prácticas
- **Usar tipos de datos nativos** (`Geometry` de `shapely`) en vez de strings para evitar conversiones innecesarias.
- **Indexar geometrías** con `rtree` cuando trabajes con colecciones grandes (>100 000 features).
- **Mantener la trazabilidad** entre CRS mediante `to_crs` y almacenar siempre el EPSG en la columna `crs` de tu DataFrame.
- **Persistir resultados** en formatos sin pérdida como `Parquet` mediante `geoparquet` para acelerar lecturas posteriores.

## Integración con notebooks y pipelines reproducibles
Los notebooks Jupyter ofrecen una experiencia interactiva ideal para prototipar análisis GIS. Para producción, encapsula el flujo en funciones y usa herramientas como `prefect` o `airflow` para orquestar tareas.

## Bibliografía
1. **O'Reilly – *Python Geospatial Development* (2021).** ISBN: 9781492089542.
2. GDAL/OGR Documentation – https://gdal.org
3. GeoPandas Documentation – https://geopandas.org
4. *Effective Python* – Brett Slatkin (capítulo de manejo de datos). ISBN: 9780134034287.
5. *PostGIS in Action* – Regina Obe, et al. (para backend espacial).

---
title: "Linux para GIS"
description: "Uso de Linux como plataforma base para herramientas y flujos GIS"
pubDate: 2026-05-31
tags: ["ARMILLARY", "GIS", "Geospatial", "GIS Desktop", "Linux"]
---

## Por qué Linux es el entorno favorito de la comunidad GIS
- **Software libre**: La mayoría de paquetes GIS (GDAL, GRASS, QGIS, PostGIS) son Open Source y se compilan sin licencias propietarias.
- **Gestión de dependencias**: Los gestores de paquetes (`apt`, `dnf`, `pacman`) facilitan la instalación de bibliotecas nativas y de desarrollo.
- **Escalabilidad**: Desde servidores en la nube hasta dispositivos embebidos (Raspberry Pi), Linux adapta su kernel a cualquier carga.

## Herramientas esenciales (línea de comandos)
| Herramienta | Función | Instalación (Debian/Ubuntu) |
|-------------|----------|------------------------------|
| **GDAL/OGR** | Conversión y procesamiento de raster/vectores | `sudo apt-get install gdal-bin libgdal-dev` |
| **GRASS GIS** | Análisis avanzado (modelado, raster) | `sudo apt-get install grass` |
| **QGIS** | GUI completa, integración con GDAL/GRASS | `sudo apt-get install qgis` |
| **PostGIS** | Extensión espacial de PostgreSQL | `sudo apt-get install postgresql postgresql-15-postgis-3` |
| **Tippecanoe** | Generación de vector tiles MBTiles | `sudo apt-get install tippecanoe` |
| **cURL / wget** | Descarga de datos remotos (WFS, WMS) | `sudo apt-get install curl wget` |

## Flujo típico de procesamiento batch
```bash
# 1. Descargar DEM de un WCS
curl -o dem.tif "https://demo.geo-solutions.it/geoserver/wcs?service=WCS&version=2.0.1&request=GetCoverage&coverageId=dem&format=image/tiff"

# 2. Recortar a un AOI (Area of Interest)
gdalwarp -cutline aoi.geojson -crop_to_cutline dem.tif aoi_dem.tif

# 3. Calcular pendiente
gdaldem slope aoi_dem.tif aoi_slope.tif

# 4. Exportar a GeoPackage
gdal_translate aoi_slope.tif output.gpkg -of GPKG
```
Este pipeline usa solo herramientas de línea de comandos, lo que facilita su automatización mediante scripts `bash` o `make`.

## Integración con Docker y contenedores
Para reproducir entornos idénticos, se recomienda utilizar imágenes oficiales:
```Dockerfile
FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y \\
    gdal-bin \ 
    python3-gdal \ 
    python3-pip && \
    pip3 install geopandas rasterio
COPY . /workspace
WORKDIR /workspace
```
Con este Dockerfile, cualquier colaborador puede lanzar `docker build -t gis-env . && docker run -v $(pwd):/workspace -it gis-env bash` y disponer de un entorno GIS completo.

## Buenas prácticas en Linux GIS
- **Usa entornos virtuales** (`python -m venv`, `conda`) para aislar dependencias de Python.
- **Mantén índices de paquetes** actualizados (`apt update && apt upgrade`).
- **Monitorea recursos** con `htop`, `iotop` y `dstat` cuando trabajes con rásters de gran tamaño.
- **Versiona datos** con `git-lfs` o sistemas de control de versiones de datasets (e.g., `dvc`).

## Bibliografía
1. **OSGeo Live – Comprehensive GIS Linux distribution** – https://live.osgeo.org/
2. **GDAL/OGR Cookbook** – http://gdal.org/gdalcookbook.html
3. **GRASS GIS Manual** – https://grass.osgeo.org/docs/manuals/
4. **QGIS Documentation** – https://docs.qgis.org/latest/en/docs/
5. *Linux for Geospatial Professionals* – O'Reilly (2022). ISBN: 9781492088161.

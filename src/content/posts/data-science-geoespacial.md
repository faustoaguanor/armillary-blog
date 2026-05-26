---
title: "Data Science Geoespacial"
description: "Aplicación de técnicas de ciencia de datos a datos espaciales y análisis geoespacial"
pubDate: 2026-06-01
tags: ["ARMILLARY", "GIS", "Geospatial", "Data Science"]
---

## Introducción
La **Data Science Geoespacial** combina métodos estadísticos, aprendizaje automático y visualización con la dimensión espacial. El objetivo es extraer patrones que dependen tanto de atributos como de la ubicación geográfica.

## Herramientas del ecosistema Python
| Herramienta | Uso principal |
|-------------|---------------|
| **GeoPandas** | Extiende pandas con objetos geométricos (`GeoSeries`). |
| **Rasterio** | Lectura/escritura de rásters y cálculo de métricas por píxel. |
| **scikit‑learn** | Algoritmos de clasificación/regresión aplicables a atributos vectoriales. |
| **PyTorch / TensorFlow** | Modelos de deep learning para detección de objetos en imágenes satelitales. |
| **EarthPy** | Funciones de visualización y análisis de datos raster y vectoriales. |
| **STAC‑Client** | Acceso a catálogos de datos satelitales vía STAC API. |

## Proceso típico de análisis
1. **Ingesta** – Descarga de datos (GeoJSON, Sentinel‑2, OpenStreetMap) usando `wget`, `stac-client` o API de OGC.
2. **Limpieza** – Normaliza CRS (`to_crs`), elimina geometrías nulas y simplifica con `simplify`.
3. **Feature Engineering** – Calcula atributos espaciales (`ST_Area`, `ST_Distance`, `GeoSeries.centroid`).
4. **Modelado** – Entrena un modelo (e.g., Random Forest) sobre atributos + coordenadas.
5. **Validación espacial** – Usa la **validación cruzada espacial** (`sklearn.model_selection.GroupKFold`) para evitar leakage.
6. **Despliegue** – Exporta predicciones a GeoJSON o a una tabla PostGIS para su consumo en QGIS/Leaflet.

## Caso de estudio: Predicción de riesgo de inundación
```python
import geopandas as gpd
import rasterio
from sklearn.ensemble import RandomForestClassifier

# 1. Cargar DEM y vectorizar cuencas
with rasterio.open('data/dem.tif') as src:
    dem = src.read(1)
    affine = src.transform

cuencas = gpd.read_file('data/cuencas.shp')
cuencas['elev_mean'] = cuencas.geometry.apply(
    lambda geom: rasterio.sample.sample_gen(src, [geom.centroid.coords[0]])[0].mean()
)

# 2. Añadir variable de precipitación histórica
prec = gpd.read_file('data/precipitacion.shp')
cuencas = cuencas.sjoin(prec, how='left', predicate='intersects')

# 3. Preparar matriz X y vector y
X = cuencas[['elev_mean', 'precip_total']]
y = cuencas['inundado']  # 0/1

# 4. Entrenar modelo
rf = RandomForestClassifier(n_estimators=200, random_state=42)
rf.fit(X, y)

# 5. Predicción
cuencas['risk_pred'] = rf.predict_proba(X)[:, 1]
cuencas.to_file('output/risk_pred.geojson', driver='GeoJSON')
```
Este script muestra cómo combinar raster (DEM) y vector (precipitación) para entrenar un modelo de riesgo.

## Buenas prácticas
- **Escalado espacial**: Normaliza coordenadas (e.g., dividir lat/lon por 180) al entrenar modelos que incluyen la ubicación.
- **Manejo de desequilibrio**: Usa técnicas como **SMOTE** espacial o pondera clases para eventos raros (inundaciones).
- **Interpretabilidad**: Herramientas como **SHAP** permiten explicar la contribución de variables geográficas a la predicción.
- **Reproducibilidad**: Versiona datasets con `dvc` y usa notebooks con kernels `ipykernel` para trazabilidad.

## Bibliografía
1. **Spatial Data Science – The Practical Guide** – *Geoffrey Watson, et al.* (2022). ISBN: 9781492089453.
2. **GeoPandas Documentation** – https://geopandas.org
3. **Machine Learning with GeoSpatial Data** – *International Journal of GIS*, 2021.
4. **STAC – SpatioTemporal Asset Catalog** – https://stacspec.org
5. **Scikit‑learn – Model Evaluation** – https://scikit-learn.org/stable/modules/model_evaluation.html

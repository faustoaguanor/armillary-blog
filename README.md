# ARMILLARY Blog

Geospatial Analysis · Data Science · GIS Development

Blog estático construido con [Astro](https://astro.build), hosteado en GitHub Pages.

## Cómo crear un nuevo post

### Opción 1: Desde GitHub.com (recomendado, sin instalar nada)

1. Ve a `src/content/posts/` en el repositorio de GitHub
2. Haz clic en **"Add file" > "Create new file"**
3. Nombra el archivo como `mi-post.md`
4. Copia esta plantilla al inicio:

```markdown
---
title: "Título de tu post"
description: "Breve descripción para la vista previa"
pubDate: 2026-05-25
tags: ["Python", "GIS"]
---

Escribe tu contenido aquí usando **Markdown**.
```

5. Haz clic en **"Commit changes"**
6. El sitio se actualiza automáticamente en 1-2 minutos

### Opción 2: Local (con VS Code)

```bash
git clone https://github.com/faustoaguanor/armillary-blog.git
cd armillary-blog
npm install
npm run dev
```

Crea un archivo `.md` en `src/content/posts/` y haz commit.

## Formato de posts

Los posts usan **Markdown** con `frontmatter` (los metadatos entre `---`).

### Markdown básico:

```markdown
## Título de sección

**texto en negrita** *texto en cursiva*

- Lista item 1
- Lista item 2

1. Lista numerada
2. Lista numerada

[Clic aquí](https://ejemplo.com)

![descripción imagen](url-de-imagen)
```

### Código:

````markdown
```python
print("Hola mundo")
```
````

## Despliegue

El deploy es automático via GitHub Actions. Solo haz push a `main`.

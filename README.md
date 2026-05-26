# ARMILLARY Blog

**ARMILLARY** — Análisis Geoespacial · Geoestadística · Ciencia de Datos · Desarrollo SIG · Calidad de Datos ISO

Blog estático construido con [Astro](https://astro.build) y hosteado en [GitHub Pages](https://pages.github.com).

**URL:** [faustoaguanor.github.io/armillary-blog](https://faustoaguanor.github.io/armillary-blog)

---

## Cómo crear un nuevo post

### Opción 1: Desde GitHub.com (sin instalar nada)

1. Ve a tu repositorio → `src/content/posts/` (ruta: `https://github.com/faustoaguanor/armillary-blog/tree/main/src/content/posts/`)
2. Haz clic en **"Add file" → "Create new file"**
3. Nombra el archivo: `mi-post.md`  
   *(usa solo letras minúsculas, guiones, sin espacios ni tildes, ejemplo: `diccionarios-python.md`)*
4. Pega esta plantilla:

```markdown
---
title: "Título del post"
description: "Breve descripción para la lista de posts"
pubDate: 2026-05-25
tags: ["Python", "GIS", "Análisis Espacial"]
---

Escribe tu contenido en **Markdown**.

## Sección de ejemplo

- Lista con viñetas
- Otro item

1. Lista numerada
2. Otro paso

```python
# Bloque de código
print("Hola mundo")
```
```

5. Haz clic en **"Commit changes..."** → confirma con mensaje como `Add: nuevo post sobre X`
6. El sitio se reconstruye y publica automáticamente en ~2 minutos (verás un check verde en **Actions**)

### Opción 2: Desde tu computadora (con Git)

```bash
# Clonar el repo
git clone https://github.com/faustoaguanor/armillary-blog.git
cd armillary-blog

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar servidor de desarrollo local
npm run dev
# Abre http://localhost:4321/armillary-blog/ en tu navegador

# Crear archivo en src/content/posts/mi-post.md
# Luego:
git add .
git commit -m "Add: nuevo post"
git push        # Push a 'main' dispara GitHub Actions automáticamente
```

---

## Plantilla rápida de post

```markdown
---
title: "Título del post"                # Obligatorio
description: "Subtítulo o resumen"       # Opcional, aparece en la lista
pubDate: 2026-05-25                     # Fecha en formato YYYY-MM-DD
tags: ["Python", "GIS", "Geoestadística"]  # Opcional
---

## Primer título

Texto con **negritas**, *cursivas*, y [links](https://ejemplo.com).

- Item de lista
- Otro item

## Código

```python
def saludo():
    return "Hola mundo"
```
```

### Imágenes

Sube la imagen al mismo directorio del post o a `public/images/` y referencias así:

```markdown
![Descripción](URL-o-ruta-relativa)
```

**Nota:** El blog usa `base: "/armillary-blog"` en la configuración. Los links internos deben empezar con `/armillary-blog/...`.

---

## ¿Cómo funciona el despliegue?

1. Haces `git push` a la rama `main` (o editas en GitHub)
2. GitHub Actions detecta el cambio y ejecuta el workflow en `.github/workflows/deploy.yml`
3. Astro construye el sitio estático (HTML/CSS/JS) en la carpeta `dist/`
4. GitHub Pages publica automáticamente el contenido de `dist/`

Puedes ver el progreso en la pestaña **Actions** de tu repositorio.

---

## Estructura del proyecto

```
armillary-blog/
├── src/
│   ├── content/
│   │   └── posts/          # Posts del blog (archivos .md)
│   ├── components/         # Componentes reutilizables (Header, Footer, etc.)
│   ├── layouts/            # Plantillas de página
│   ├── pages/              # Páginas (index, blog post, RSS)
│   ├── styles/             # CSS global
│   └── assets/             # Logo, iconos
├── public/                 # Archivos estáticos (copiados tal cual a dist/)
├── .github/workflows/       # GitHub Actions para deploy
└── astro.config.mjs        # Configuración de Astro (base: "/armillary-blog")
```

---

## ¿Problemas?

- Si el sitio no se actualiza, revisa la pestaña **Actions** en GitHub para ver si hay algún error
- Si un post no aparece, verifica que el `frontmatter` tenga formato correcto (las lineas `---` al inicio)
- Las fechas en `pubDate` deben ser `YYYY-MM-DD` (ej: `2026-05-25`)

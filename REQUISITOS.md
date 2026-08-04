# Requisitos - "¡Ven que te lo cuento!"

## 1. Descripción general

Web estática de patrimonio cultural, centrada principalmente en la Región de Murcia, que muestra en un mapa interactivo la localización de reels de Instagram sobre lugares de interés patrimonial. Complementada con un blog de artículos y una sección "Sobre mí".

- **Público objetivo**: seguidores de la cuenta de Instagram y personas interesadas en patrimonio cultural.
- **Volumen estimado**: hasta 1.000 visitas diarias.
- **Hosting**: GitHub Pages (sitio estático, sin base de datos, sin backend).
- **Dominio**: dominio propio asociado a GitHub Pages.

---

## 2. Arquitectura y tecnología

| Aspecto | Decisión |
|---|---|
| Generador estático | Astro (facilita blog con Markdown, componentes interactivos y sitio estático) |
| Mapa | Leaflet.js + OpenStreetMap |
| Hosting | GitHub Pages |
| Datos de reels | Archivo JSON único (`reels.json`) en el repositorio |
| Artículos del blog | Archivos Markdown (`.md`) con frontmatter |
| Base de datos | Ninguna |

---

## 3. Estructura de la web

### 3.1. Página principal - Mapa interactivo

- Mapa a pantalla completa (o casi completa) con cabecera/navegación superpuesta.
- Centrado inicial en la Región de Murcia, pero permite navegar a cualquier zona.
- Tiles de OpenStreetMap.
- **Indicadores (markers)**: un marcador por cada reel en su ubicación de grabación.
  - Diferenciados por categoría (ej: iglesias, castillos, yacimientos, paisajes...).
  - Las categorías deben ser configurables: el autor puede añadir o eliminar categorías.
  - Icono o color distinto por categoría.
- **Clusters**: cuando hay varios marcadores cercanos, se agrupan en un cluster que muestra el número de puntos. Al hacer zoom se dispersan.
- **Popup al pulsar un marcador**:
  - Miniatura del reel (imagen).
  - Título del reel.
  - Enlace al reel de Instagram (abre en nueva pestaña).

### 3.2. Sección "Sobre mí"

- Página sencilla con:
  - Foto del autor.
  - Bio / texto descriptivo.
  - Enlaces a redes sociales (Instagram, y las que se añadan).

### 3.3. Blog

- Listado de artículos ordenados cronológicamente (más reciente primero).
- Cada artículo:
  - Título.
  - Fecha de publicación.
  - Texto del artículo.
  - Una o dos fotografías.
  - Etiquetas/tags.
- Filtrado por etiquetas.
- Artículos escritos en Markdown con frontmatter para metadatos (título, fecha, tags, imágenes).

### 3.4. Navegación

- Barra de navegación con:
  - Logo/nombre: "¡Ven que te lo cuento!"
  - Enlaces: Mapa (inicio) | Blog | Sobre mí

---

## 4. Modelo de datos

### 4.1. Reels (`src/data/reels.json`)

```json
[
  {
    "id": "001",
    "titulo": "Catedral de Murcia",
    "descripcion": "Breve descripción del reel",
    "categoria": "iglesias",
    "lat": 37.9838,
    "lng": -1.1285,
    "miniatura": "/img/reels/catedral-murcia.jpg",
    "urlReel": "https://www.instagram.com/reel/XXXX"
  }
]
```

### 4.2. Categorías (`src/data/categorias.json`)

```json
[
  {
    "id": "iglesias",
    "nombre": "Iglesias y catedrales",
    "icono": "church",
    "color": "#d97757"
  },
  {
    "id": "castillos",
    "nombre": "Castillos y fortalezas",
    "icono": "castle",
    "color": "#eda100"
  }
]
```

### 4.3. Artículos del blog (`src/content/blog/mi-articulo.md`)

```markdown
---
title: "Título del artículo"
date: 2026-03-21
tags: ["murcia", "patrimonio", "barroco"]
images:
  - "/img/blog/foto1.jpg"
  - "/img/blog/foto2.jpg"
---

Contenido del artículo en Markdown...
```

---

## 5. Diseño visual

### 5.1. Paleta de colores (inspirada en Anthropic)

| Uso | Color | Hex |
|---|---|---|
| Fondo principal | Crema cálido | `#E8E6DC` |
| Texto principal | Carbón oscuro | `#141413` |
| Texto secundario | Carbón medio | `#30302E` |
| Acento primario | Terracota | `#D97757` |
| Acento secundario | Dorado | `#EDA100` |
| Fondo oscuro (nav, footer) | Negro cálido | `#141413` |

### 5.2. Tipografía

- **Títulos y encabezados**: fuente serif (ej: `Playfair Display` o similar con carácter editorial).
- **Cuerpo de texto y UI**: fuente sans-serif (ej: `Inter` o `DM Sans`).

### 5.3. Estilo general

- Minimalista y elegante.
- Espacios amplios.
- Bordes redondeados suaves.
- Sin animaciones excesivas.

---

## 6. Flujo de trabajo para añadir contenido

### Añadir un reel nuevo:
1. Añadir la miniatura en `/public/img/reels/`.
2. Añadir una entrada al archivo `reels.json` con los datos del reel.
3. Commit y push → GitHub Pages se actualiza automáticamente.

### Añadir un artículo al blog:
1. Crear un archivo `.md` en `src/content/blog/`.
2. Añadir las imágenes en `/public/img/blog/`.
3. Commit y push → GitHub Pages se actualiza automáticamente.

---

## 7. Requisitos no funcionales

- **Rendimiento**: al ser estática, carga rápida. Lazy loading para miniaturas de reels.
- **SEO**: meta tags, Open Graph, sitemap.
- **Responsive**: adaptada a móvil, tablet y escritorio.
- **Accesibilidad**: contraste adecuado, alt en imágenes, navegación por teclado.

---

## 8. Fuera de alcance (no se implementa)

- Panel de administración.
- Base de datos.
- Autenticación / login.
- Comentarios en el blog.
- Integración automática con la API de Instagram.
- Buscador de texto completo.

# ¡Ven, que te lo cuento!

Página personal de Carmen Celdrán Gómez: mapa, vídeos y artículos sobre los
lugares, historias y tradiciones de la Región de Murcia.

Hecha con [Astro](https://astro.build) y [Leaflet](https://leafletjs.com),
publicada en GitHub Pages. **No hay base de datos**: todo el contenido vive en
ficheros del repositorio, así que añadir contenido = editar un fichero y subirlo.

---

## Cómo se publica cualquier cambio

1. Edita los ficheros que toquen (abajo se explica cuáles).
2. Haz commit y push a la rama `main`.
3. GitHub Actions reconstruye y publica la web sola en 1-2 minutos.

No hay paso 4. El buscador, los contadores, los filtros, el sitemap, el tiempo
de lectura, los relacionados… **todo se recalcula solo en cada build**. Nunca
hay que tocarlos a mano.

---

## Reels

Los reels viven en un único fichero: [`src/data/reels.json`](src/data/reels.json).
Sus miniaturas, en [`public/img/reels/`](public/img/reels/).

### Añadir un reel (opción cómoda: el editor visual)

1. Arranca la web en local (`npm run dev`) y abre `http://localhost:4321/admin`.
2. Busca la dirección o haz clic en el mapa para colocar el marcador.
3. Rellena título, categoría y enlace de Instagram, y pulsa **Añadir reel**.
4. Pulsa **Guardar en reels.json** (o **Descargar JSON** y reemplaza el fichero).
5. Copia la miniatura a `public/img/reels/` con el nombre que te indica el editor.

`/admin` solo existe en tu ordenador: no se publica en la web (y aunque
alguien lo encontrara, no puede tocar nada del servidor, porque no lo hay).

### Añadir un reel (opción manual)

Añade un bloque al final de `src/data/reels.json`:

```json
{
  "id": "136",
  "titulo": "El título del reel",
  "descripcion": "",
  "categoria": "curiosidades",
  "lat": 37.988948,
  "lng": -1.131137,
  "miniatura": "/img/reels/136-el-titulo-del-reel.jpg",
  "urlReel": "https://www.instagram.com/p/XXXXXXXXXXX/"
}
```

- **id**: el siguiente número, siempre con tres cifras (`136`, no `36`).
- **categoria**: uno de los ids de [`src/data/categorias.json`](src/data/categorias.json)
  (`abandonado`, `palacios`, `personajes`, `curiosidades`, `semana-santa`…).
- **lat / lng**: en Google Maps, clic derecho sobre el lugar → copiar coordenadas.
- **miniatura**: la ruta de la foto. El fichero va en `public/img/reels/` y
  **el nombre debe coincidir exactamente** (¡ojo con los ceros del principio!:
  `036-...jpg` y `36-...jpg` no son lo mismo). Si la foto aún no existe, no pasa
  nada: se muestra el icono de su categoría hasta que la subas.

### Editar un reel

Edita su bloque en `reels.json` (título, coordenadas, categoría, enlace…).
Si cambias la ruta de la miniatura, renombra también el fichero de la foto.

### Borrar un reel

Borra su bloque de `reels.json` y, si quieres, su foto de `public/img/reels/`.
No renumeres los demás: los ids no tienen que ser correlativos.

### Qué se actualiza solo al tocar reels

El marcador del mapa, la página de Vídeos (su buscador incluido), el contador
«X vídeos» de la portada, los números del filtro de categorías, la miniatura
reducida que se sirve en la web y el sitemap. **Nada más que tocar.**

---

## Artículos

Cada artículo es un fichero Markdown en [`src/content/blog/`](src/content/blog/).
Sus fotos, en [`public/img/blog/`](public/img/blog/).

### Añadir un artículo

1. Crea `src/content/blog/mi-nuevo-articulo.md` (el nombre del fichero será su
   URL: `/blog/mi-nuevo-articulo` — minúsculas, guiones, sin tildes).
2. Copia esta plantilla y rellénala:

```markdown
---
title: "El título del artículo"
date: 2026-08-14
tags: ["patrimonio", "historia"]
images:
  - "/img/blog/mi-nuevo-articulo-1.jpg"
  - "/img/blog/mi-nuevo-articulo-2.jpg"
description: "Un par de frases de resumen. Salen en la tarjeta del listado y en Google."
---

El texto del artículo, en párrafos normales.

<figure>
  <img src="/img/blog/mi-nuevo-articulo-1.jpg" alt="Qué se ve en la foto">
  <figcaption>Pie de foto (opcional).</figcaption>
</figure>

Más texto…
```

3. Copia las fotos a `public/img/blog/` con esos nombres.

Detalles que conviene saber:

- **La primera foto de `images` es la portada**: sale grande bajo el título,
  en la tarjeta del listado, en la portada de la web y al compartir el enlace
  por WhatsApp. Su copia dentro del texto se oculta sola para no repetirse.
- **tags**: usa las que ya existen si encajan (patrimonio, historia,
  arquitectura, arte, personajes, tradiciones, leyendas, huerta, gastronomía,
  música). Si escribes una nueva, aparece sola en los filtros — no hay ninguna
  lista que mantener.
- Las rutas de las fotos siempre empiezan por `/img/blog/` — el prefijo de la
  subcarpeta de GitHub Pages se añade solo al publicar.

### Qué se actualiza solo al tocar artículos

Todo: el contador «X artículos» de la portada, el buscador, los filtros por
tema (con sus números), el artículo destacado (siempre el de fecha más
reciente), el tiempo de lectura, los «Te puede interesar», el
anterior/siguiente, el escaparate de la portada y el sitemap.

### Editar un artículo

Edita el `.md` y guarda. Para cambiar una foto, reemplaza el fichero en
`public/img/blog/` manteniendo el nombre (o cambia nombre y ruta a la vez).

### Borrar un artículo

Borra su `.md` y sus fotos de `public/img/blog/`.

---

## Las fotos, en general

- Formato JPG, y mejor si no pasan de ~1200-1600 px de lado: cargan rápido y
  se ven perfectas.
- Las miniaturas de los reels se **reducen solas al publicar** (a 480 px de
  ancho, en webp): en la página de Vídeos y en los popups del mapa se sirve la
  versión ligera, así que puedes subir el JPG tal cual sale del móvil.
- Nombres de fichero sin espacios, sin tildes y en minúsculas:
  `casa-del-piñon.jpg` ❌ → `casa-del-pinon.jpg` ✅
- Si una foto sale girada, ábrela en Vista Previa del Mac, gírala y guarda,
  antes de copiarla al proyecto.

### og.jpg y hero.jpg (las dos imágenes «especiales»)

- `public/img/og.jpg`: la tarjeta que sale al compartir la web por WhatsApp o
  redes (los artículos usan su propia foto, esta es para el resto de páginas).
- `public/img/hero.jpg`: el fondo de la portada.

Las dos son **mosaicos de miniaturas de reels generados a mano** — no se
regeneran solos al añadir reels. No hace falta tocarlas nunca, pero si algún
día quieres refrescarlas con fotos nuevas, pídeselo a Claude (el procedimiento
está documentado en su memoria del proyecto).

---

## Categorías de reels

Viven en [`src/data/categorias.json`](src/data/categorias.json): id, nombre,
icono (un SVG en línea) y color. Para añadir una categoría nueva, copia un
bloque existente y cambia esas cuatro cosas; los filtros del mapa y la página
de Vídeos la recogen solos. Las categorías sin ningún reel no se muestran.

Cada categoría tiene su propio enlace en la página de Vídeos, formado con su
id: `…/videos#semana-santa` abre la página ya filtrada por Semana Santa. Sirve
para compartir una categoría concreta por WhatsApp o desde Instagram. Por eso
conviene no cambiar el id de una categoría existente (cambiar el nombre sí es
gratis).

---

## Desarrollo local

```bash
npm install
npm run dev
```

Web en `http://localhost:4321` y editor de reels en `http://localhost:4321/admin`.

Cuando llegue el dominio propio: en [`astro.config.mjs`](astro.config.mjs) pon
`site: 'https://venquetelocuento.es'` y `base: '/'`, y crea `public/CNAME` con
el dominio. Está comentado en el propio fichero.
